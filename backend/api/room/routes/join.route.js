const express = require('express');
const { handleConnectionState, handleClose } = require('../controllers/join.controller');
const expressWs = require('express-ws');
const uuid = require('uuid');
const { getByPin } = require('../utils/database/room');
const { removePlayer } = require('../utils/database/room_players');
const { removeAlternative } = require('../utils/database/room_questions');
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 10, // 10 connections per 1 minute
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

const wsInstance = expressWs(router);
const wss = wsInstance.getWss();
wss.connections = {};

router.get('/', (req,res)=>res.send('working'));

wss.removeConnection = (room_id, id) => {
    const conn = wss.connections[room_id]?.filter(x => x.id == id)[0];
    const index = wss.connections[room_id]?.indexOf(conn) || -1;
    if (index != -1) {
        wss.connections[room_id].splice(index, 1);
    }
}

function setupEvents(ws, data){
    if(ws == null) return;

    ws.on('message', msg => {
        //console.log('message ['+data.userinfo.id+']: ', msg);
        if(handleConnectionState(data, msg)) ++data.state;
    });

    ws.on('close', () => {
        //console.log('connection '+data.userinfo.id+' closed');
        data.wss.removeConnection(data.room_id, data.userinfo.id);
        //removeAlternative(data.room_id, data.userinfo.id);
        handleClose(data);
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
        wss: wss,
        connection: ws,
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

    if(!wss.connections[data.room_id]) wss.connections[data.room_id] = [];

    wss.connections[data.room_id]?.push({id: data.userinfo.id, ws: ws});

    //console.log('connection '+data.userinfo.id+' open for room '+data.room_id);

    ws.send(JSON.stringify({type: 'request'}));
});

module.exports = router;