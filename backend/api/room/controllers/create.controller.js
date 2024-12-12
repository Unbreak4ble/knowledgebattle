const { createToken } = require('../utils/token');
const uuid = require('uuid');
const { create } = require('../utils/database/room');
const { roomSchema } = require('../models/room.model');
const { generatePin } = require('../utils/room');

async function createRoom(data){
    const val = roomSchema.validate(data);
    if(val.error) return;

    const id = uuid.v4().replaceAll('-', '');
    const pin = generatePin();

    const room = {
        id: id,
        pin: pin,
        name: data.text,
        questions: data.questions.map(x => (x.finished = false, x)),
        current_question_id: 0,
        settings: data.settings,
        creation_timestamp: Math.floor(new Date().getTime()/1000),
        max_players: 100,
        players_count: 0,
        active: false // the owner can active it on admin page
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