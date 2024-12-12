
async function sendBroadcast(wss, room_id, message){
    const clients = wss.connections[room_id] || [];

    for(const client of clients){
        await client.ws.send(message);
    }
}

async function kickBroadcast(wss, room_id){
    const clients = wss.connections[room_id] || [];

    for(const client of clients){
        await client.ws.close();
    }
}

module.exports =  {
    sendBroadcast,
    kickBroadcast
}