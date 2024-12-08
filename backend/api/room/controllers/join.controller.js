const expressWs = require('express-ws');

function joinController(router){
    expressWs(router);

    router.get('/', (req,res)=>res.send('working'));

    router.ws('/', (ws, req) => {
        console.log('new user');
        ws.on('message', msg => {
            console.log(msg)
        })
    });
}

module.exports = {
    joinController
};