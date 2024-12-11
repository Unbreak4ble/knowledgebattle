
function sendBroadcast(wss, room_id, message){
    const clients = wss.connections[room_id] || [];

    for(const client of clients){
        client.ws.send(message);
    }
}

module.exports =  {
    sendBroadcast
}