const { updateAppend, remove, get, updateSet } = require("./database/room");
const { deletePlayersList } = require("./database/room_players");

function generatePin(){
    return Math.floor(100000000 + Math.random()*900000000);
}

async function updatePin(room_id, pin){
    await updateSet(room_id, 'pin', pin);
}

async function updateSetting(room_id, setting){
    const room = await get(room_id);

    if(room == null) return;

    const settings = room.settings.map(x => (x.id == setting.id ? (x.allow = setting.allow) : 0, x));

    await updateSet(room_id, 'settings', settings);
}

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
    fullDeleteRoom,
    updateSetting,
    generatePin,
    updatePin
}