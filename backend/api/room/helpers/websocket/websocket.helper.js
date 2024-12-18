
function messageThrottle(func, timeFrame) {
    var lastTime = 0;
    return function(event) {
      let now = new Date().getTime();
      if (now - lastTime >= timeFrame) {
        func(event);
        lastTime = now;
      }
    };
}

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
    messageThrottle,
    sendBroadcast,
    kickBroadcast
}