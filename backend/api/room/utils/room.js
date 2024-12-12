const { updateInsert, updateAppend, remove } = require("./database/room");
const { deletePlayersList } = require("./database/room_players");


async function appendQuestions(room_id, questions){
    for(const question of questions){
        await updateAppend(room_id, 'questions', question);
    }
}

async function fullDeleteRoom(room_id){
    await remove(room_id);
    await deletePlayersList(room_id);
}

module.exports = {
    appendQuestions,
    fullDeleteRoom
}