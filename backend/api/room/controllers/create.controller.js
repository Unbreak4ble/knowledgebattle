const Joi = require('joi');
const { createToken } = require('../utils/token');
const uuid = require('uuid');
const { create } = require('../utils/database/room');

const roomSchema = Joi.object({
    text: Joi.string().max(64).min(2),
    questions: Joi.array().items(Joi.object({
        id: Joi.number(),
        text: Joi.string(),
        alternatives: Joi.array().items(Joi.object({
            text: Joi.string().min(1)
        }))
    })),
    settings: Joi.array()
});

async function createRoom(data){
    const val = roomSchema.validate(data);
    if(val.error) return;

    const id = uuid.v4().replaceAll('-', '');
    const pin = Math.floor(100000 + Math.random()*900000);

    const room = {
        id: id,
        pin: pin,
        title: data.text,
        questions: data.questions,
        settings: data.settings
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