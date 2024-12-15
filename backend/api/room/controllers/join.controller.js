const { validateToken } = require('../utils/token');
const { listPlayers, addPlayer, removePlayer } = require('../utils/database/room_players');
const { getByPin, get } = require('../utils/database/room');
const { loadAdminCommands, loadUserCommands } = require('./commands.controller');
const { updatePlayersCount, getCurrentQuestion } = require('../utils/room');
const { getQuestionById } = require('../utils/database/room_questions');
const { validateUsername } = require('../validators/user');

/*
 * state:
 * - 0 : data request for recognition
 * - 1 : go for connection; handle commands
 * 
*/
async function handleDataRequest(data, message){
    const connection = data.connection;
    const room = await get(data.room_id);

    if(room == null) return;

    if(room.players_count >= room.max_players){
        await connection.send(JSON.stringify({type: 'request_failed', data: { message: "Room is full" }}));
        
        await new Promise(resolve => setTimeout(resolve, 100));

        connection.close();
    }

    try{
        const parsed_msg = JSON.parse(message);

        const token = parsed_msg.token;

        const name = parsed_msg.name;

        if(!validateUsername(name)){
            await connection.send(JSON.stringify({type: 'request_failed', data: { message: "Invalid username format" }}));
            await new Promise(resolve => setTimeout(resolve, 100));
            return connection.close();
        }

        data.userinfo.name = name;

        if(token){
            if(!validateToken(token)) return connection.close();
            data.userinfo.isAdmin = true;
        }else{
            data.userinfo.isAdmin = false;
        }

        await addPlayer(data.room_id, {...data.userinfo});

        if(token){
            data.userinfo.token = token;
        }

        connection.send(JSON.stringify({type: 'recognition', data: data.userinfo}));

        handlePeriodicResponses(data);

        await updatePlayersCount(data.room_id);

        connection.send(JSON.stringify({type: 'question', data: await getCurrentQuestion(data.room_id, true)}));

        return true;
    }catch(err){
        console.log('failed to handle data request', err);
        connection.send(JSON.stringify({ type: 'request_failed', data: { message:'failed to process data request. Try again' } }));
    }
}

function handleAdminCommands(data, message){
    const command = JSON.parse(message);

    loadAdminCommands(data)[command.type]?.(command.data);
}

function handleUserCommands(data, message){
    const command = JSON.parse(message);
    
    loadUserCommands(data)[command.type]?.(command.data);
}

function handleCommands(data, message){
    if(data.userinfo.token)
        handleAdminCommands(data, message);
    else
        handleUserCommands(data, message);
}

function handleConnectionState(data, message){
    const handlers = [handleDataRequest, handleCommands];
    
    return handlers[data.state](data, message);
}

function sendPeriodicPlayers(data){
    const connection = data.connection;
    setInterval(async () => {
        const players = await listPlayers(data.room_id) || [];
        const players_response = {type:'players', data: players};
        connection.send(JSON.stringify(players_response));
    }, 500);
}

function handlePeriodicAdminResponses(data){
    const connection = data.connection;
    setInterval(async () => {
        const room = await get(data.room_id);

        if(room == null) return;

        const question = await getQuestionById(data.room_id, room.current_question_id);

        const question_response = {type:'question_update', data: question };

        if(question == null) {
            //question_response.data = {id: room.current_question_id}; // just testing
            return;
        }

        connection.send(JSON.stringify(question_response));
    }, 500);
}

function handlePeriodicUserResponses(data){
    
}

function handlePeriodicResponses(data){
    // global periodic responses
    sendPeriodicPlayers(data);

    // class periodic responses
    if(data.userinfo.isAdmin){
        handlePeriodicAdminResponses(data);
    }else{
        handlePeriodicUserResponses(data);
    }
}

async function handleClose(data){
    await removePlayer(data.room_id, data.userinfo.id);
    await updatePlayersCount(data.room_id);
}

module.exports = {
    handleConnectionState,
    handleClose
};