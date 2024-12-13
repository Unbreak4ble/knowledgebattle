const { fixQuestionsIds } = require("../fixers/room");
const { sendBroadcast, kickBroadcast } = require("../helpers/websocket/websocket.helper");
const { get } = require("../utils/database/room");
const { appendQuestions, updateSetting, generatePin, updatePin, updateActive } = require("../utils/room");
const { validateQuestionsRequest } = require("../validators/room");

function loadAdminCommands(data){
    return {
        'start': async () => {
            const response = {
                type: 'start',
                data: {
                    timeout: 10,
                }
            };

            await updateActive(data.room_id, true);

            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
        'stop': async () => {
            const response = {
                type: 'stop',
                data: null
            };

            await updateActive(data.room_id, false);

            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
        'kick_all': async (payload) => {
            const response = {
                type: 'kick',
                data: {
                    message: payload?.reason || "Kicked for no reason"
                }
            };

            await sendBroadcast(data.wss, data.room_id, JSON.stringify(response));

            await new Promise(resolve => setTimeout(resolve, 10));

            await kickBroadcast(data.wss, data.room_id);

        },
        'new_question': async (payload) => {
            const questions = payload.questions;

            if(!validateQuestionsRequest(questions)) {
                return data.connection?.send(JSON.stringify({type: 'request_failed', data: { type: 'new_question', from: data.userinfo.id, message: "Invalid questions list" }}));
            }

            const room = await get(data.room_id);

            if(room == null) {
                return data.connection?.send(JSON.stringify({type: 'request_failed', data: { type: 'new_question', from: data.userinfo.id, message: "Room not found" }}));
            }

            const fixed_questions = fixQuestionsIds([...room.questions, ...questions]).slice(room.questions.length, room.questions.length+questions.length);
            
            await appendQuestions(data.room_id, fixed_questions);

            data.connection?.send(JSON.stringify({type: 'new_question', data: { questions: questions }}));
        },
        'update_rule': async (payload) => {
            if(!(payload.id && payload.allow)) return;

            const response = {
                type: 'update_rule',
                data: {
                    id: payload.id,
                    allow: payload.allow
                }
            };
            
            await updateSetting(data.room_id, payload);

            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
        'update_pin': async (payload) => {
            const new_pin = generatePin();

            const response = {
                type: 'update_pin',
                data: {
                    pin: new_pin
                }
            };

            await updatePin(data.room_id, new_pin);

            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
    };
}

function loadUserCommands(data){
    return {
        'answer_question': (payload) => {

        }
    }
}

module.exports = {
    loadAdminCommands,
    loadUserCommands
}