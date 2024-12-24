const { listPublicRooms } = require("../utils/room");

async function listController(){
    const rooms = await listPublicRooms();

    return rooms;
}

module.exports = {
    listController
}