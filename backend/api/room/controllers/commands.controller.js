const { sendBroadcast } = require("../helpers/websocket/websocket.helper");
const { appendQuestions } = require("../utils/room");

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
        'new_question': async (payload) => {
            const questions = payload.questions;

            console.log('new questions received', data.room_id, questions.length, data.connection);
            
            await appendQuestions(data.room_id, questions);

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