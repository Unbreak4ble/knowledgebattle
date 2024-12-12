const { validateToken } = require('../utils/token');
const { listPlayers, addPlayer, removePlayer } = require('../utils/database/room_players');
const { getByPin } = require('../utils/database/room');
const { loadAdminCommands, loadUserCommands } = require('./commands.controller');

/*
 * state:
 * - 0 : data request for recognition
 * - 1 : go for connection; handle commands
 * 
*/
async function handleDataRequest(data, message){
    const connection = data.connection;
    try{
        const parsed_msg = JSON.parse(message);

        const token = parsed_msg.token;

        const name = parsed_msg.name;

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

        return true;
    }catch(err){
        console.log('failed to handle data request');
        connection.send(JSON.parse({ type: 'request_failed', data: { message:'failed to process data request. Try again' } }));
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


module.exports = {
    handleConnectionState
};