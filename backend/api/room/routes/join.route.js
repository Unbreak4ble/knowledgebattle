const express = require('express');
const { joinController } = require('../controllers/join.controller');
const expressWs = require('express-ws');
const uuid = require('uuid');
const { validateToken } = require('../utils/token');
const { listPlayers, addPlayer, removePlayer } = require('../utils/database/room_players');
const { getByPin } = require('../utils/database/room');

const router = express.Router();

const wsInstance = expressWs(router);
const wss = wsInstance.getWss();

router.get('/', (req,res)=>res.send('working'));

/*
 * state:
 * - 0 : data request for recognition
 * - 1 : go for connection; handle commands
 * 
*/

async function handleDataRequest(data, connection, message){
    try{
        const parsed_msg = JSON.parse(message);

        const token = parsed_msg.token;

        const name = parsed_msg.name;

        data.userinfo.name = name;

        await addPlayer(data.room_id, {...data.userinfo});

        if(token){
            if(!validateToken(token)) return connection.close();
            data.userinfo.token = token;
        }

        connection.send(JSON.stringify(data.userinfo));

        handlePeriodicResponses(data, connection);

        return true;
    }catch(err){
        console.log('failed to handle data request');
        connection.send(JSON.parse({status: 'error', data: 'failed to process data request. Try again'}));
    }
}

function handleAdminCommands(data, connection, message){
    console.log('message from admin');
}

function handleUserCommands(data, connection, message){
    console.log('message from user');
}

function handleCommands(data, connection, message){
    if(data.userinfo.token)
        handleAdminCommands(data, connection, message);
    else
        handleUserCommands(data, connection, message);
}

function handleConnectionState(data, connection, message){
    const handlers = [handleDataRequest, handleCommands];
    
    return handlers[data.state](data, connection, message);
}

function sendPeriodicPlayers(data, connection){
    setInterval(async () => {
        const players = await listPlayers(data.room_id) || [];
        const players_response = {type:'players', data: players};
        connection.send(JSON.stringify(players_response));
    }, 500);
}

function handlePeriodicResponses(data, connection){
    sendPeriodicPlayers(data, connection);
}

function setupEvents(ws, data){
    if(ws == null) return;

    ws.on('message', msg => {
        console.log('message ['+data.userinfo.id+']: ', msg);
        if(handleConnectionState(data, ws, msg)) ++data.state;
    });

    ws.on('close', () => {
        console.log('connection '+data.userinfo.id+' closed');
        removePlayer(data.room_id, data.userinfo.id);
    });

    ws.on('error', () => {
        console.log('error');
    });
}

router.ws('/:pin', async (ws, req) => {
    const data = {
        pin: req.params.pin,
        room_id: '',
        state: 0,
        userinfo: {id: '', name: ''}
    };

    setupEvents(ws, data);

    if(!(data.pin)) return ws.close();

    data.userinfo.id = uuid.v4();

    const room = await getByPin(data.pin);

    if(room == null){
        return ws.close();
    }

    data.room_id = room.id;

    console.log('connection '+data.userinfo.id+' open for room '+data.room_id);

    ws.send(JSON.stringify({type: 'request'}));
});

module.exports = router;