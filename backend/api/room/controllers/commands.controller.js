const { sendBroadcast } = require("../helpers/websocket/websocket.helper");

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
        'new_question': (payload) => {
            const questions = payload.questions;
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