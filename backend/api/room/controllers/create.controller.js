const { createToken } = require('../utils/token');
const uuid = require('uuid');
const { create } = require('../utils/database/room');
const { roomSchema } = require('../models/room.model');

async function createRoom(data){
    const val = roomSchema.validate(data);
    if(val.error) return;

    const id = uuid.v4().replaceAll('-', '');
    const pin = Math.floor(100000000 + Math.random()*900000000);

    const room = {
        id: id,
        pin: pin,
        name: data.text,
        questions: data.questions,
        settings: data.settings,
        creation_timestamp: Math.floor(new Date().getTime()/1000),
        max_players: 100,
        players_count: 0,
    };

    if(!await create(room)) return;

    const result = {
        token: createToken(id),
        id: id,
        pin: pin
    };

    return result;
}

module.exports = {
    createRoom
}