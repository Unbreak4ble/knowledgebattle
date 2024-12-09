const express = require('express');
const { joinController } = require('../controllers/join.controller');
const expressWs = require('express-ws');
const uuid = require('uuid');
const { validateToken } = require('../utils/token');

const router = express.Router();

const wsInstance = expressWs(router);
const wss = wsInstance.getWss();

router.get('/', (req,res)=>res.send('working'));

/*
 * state:
 * - 0 : data request
 * - 1 : recognition
 * - 2 : go for connection
 * 
*/

function handleDataRequest(data, connection, message){
    try{
        const parsed_msg = JSON.parse(message);

        const token = parsed_msg.token;

        const name = parsed_msg.name;

        console.log('received:', parsed_msg);

        if(token){
            if(!validateToken(token)) return connection.close();
            data.userinfo.token = token;
        }

        data.userinfo.name = name;

        connection.send(JSON.stringify(data.userinfo));

        return true;
    }catch(err){
        connection.send(JSON.parse({status: 'error', data: 'failed to process data request. Try again'}));
    }
}

function handleRecognition(data, connection, message){

}

function handleAnswers(data, connection, message){

}

function handleConnectionState(data, connection, message){
    const handlers = [handleDataRequest, handleRecognition, handleAnswers];

    return handlers[data.state](data, connection, message);
}

router.ws('/:pin', async (ws, req) => {
    const data = {
        pin: req.params.pin,
        state: 0,
        userinfo: {uid: 0, name: ''}
    };

    if(!(data.pin)) return ws.close();

    data.userinfo.id = uuid.v4();

    console.log('connection '+data.userinfo.id+' open');
    
    ws.on('message', msg => {
        //console.log(id+': ', msg);
        if(handleConnectionState(data, ws, msg)) ++data.state;
    });

    ws.on('close', () => {
        console.log('connection '+data.userinfo.id+' closed');
    });
});

module.exports = router;