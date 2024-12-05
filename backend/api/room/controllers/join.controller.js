const expressWs = require('express-ws');
const express = require('express');

function joinController(app){
    expressWs(app);

    //const router = express.Router();

    app.ws('/join', (ws, req) => {
        console.log('new user');
        ws.on('message', msg => {
            console.log(msg)
        })
    });
}

module.exports = {
    joinController
};