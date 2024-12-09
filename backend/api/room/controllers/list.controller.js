const { listPublic } = require("../utils/database/room")

async function listController(){
    const rooms = await listPublic();

    return rooms;
}

module.exports = {
    listController
}