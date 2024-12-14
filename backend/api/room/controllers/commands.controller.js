const { fixQuestionsIds } = require("../fixers/room");
const { sendBroadcast, kickBroadcast } = require("../helpers/websocket/websocket.helper");
const { get } = require("../utils/database/room");
const { setPlayerAnswer } = require("../utils/question");
const { appendQuestions, updateTimeout, updateSetting, generatePin, updatePin, updateActive, updateCurrentQuestionId, getCurrentQuestion } = require("../utils/room");
const { validateQuestionsRequest } = require("../validators/room");

function loadAdminCommands(data){
    return {
        'start': async () => {
            const timeout = 60*60;

            const response = {
                type: 'start',
                data: {
                    timeout: timeout,
                }
            };

            await updateActive(data.room_id, true);
            await updateTimeout(data.room_id, timeout);

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
        'next_question': async (payload) => {
            const room = await get(data.room_id);

            if(room == null) return;

            const id = ++room.current_question_id;

            if(id >= room.questions.length) return;
 
            await updateCurrentQuestionId(data.room_id, id);

            const response = {
                type: 'question',
                data: await getCurrentQuestion(data.room_id, true)
            };

            sendBroadcast(data.wss, data.room_id, JSON.stringify(response));
        },
    };
}

function loadUserCommands(data){
    return {
        'answer_question': async (payload) => {
            const room_id = data.room_id;

            const room = await get(room_id);

            if(room == null) return;

            const question_id = room.current_question_id;
            const player_id = data.userinfo.id;
            const alternative_id = payload.alternative_id;

            await setPlayerAnswer(room_id, question_id, alternative_id, player_id);
        }
    }
}

module.exports = {
    loadAdminCommands,
    loadUserCommands
}