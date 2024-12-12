const { fixQuestionsIds } = require("../fixers/room");
const { sendBroadcast, kickBroadcast } = require("../helpers/websocket/websocket.helper");
const { get } = require("../utils/database/room");
const { appendQuestions } = require("../utils/room");
const { validateQuestionsRequest } = require("../validators/room");

function loadAdminCommands(data){
    return {
        'start': () => {
            const response = {
                type: 'start',
                data: {
                    timeout: 10,
                }
            };
            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
        'stop': () => {
            const response = {
                type: 'stop',
                data: null
            };
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
        'update_rules': (payload) => {
            const rules = payload.rules;

            const response = {
                type: 'rules_updated',
                data: rules
            };

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