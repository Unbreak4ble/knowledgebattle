const roomLib = require("./database/room");
const { deletePlayersList, listPlayers } = require("./database/room_players");

function generatePin(){
    return Math.floor(100000000 + Math.random()*900000000);
}

async function updatePin(room_id, pin){
    await roomLib.updateSet(room_id, 'pin', pin);
}

async function updateActive(room_id, active=false){
    await roomLib.updateSet(room_id, 'active', active);
}

async function updatePlayersCount(room_id){
    const count = (await listPlayers(room_id))?.length | 0;
    
    await roomLib.updateSet(room_id, 'players_count', count);
}

async function updateSetting(room_id, setting){
    const room = await get(room_id);

    if(room == null) return;

    const settings = room.settings.map(x => (x.id == setting.id ? (x.allow = setting.allow) : 0, x));

    await roomLib.updateSet(room_id, 'settings', settings);
}

async function appendQuestions(room_id, questions){
    console.log('lib;',roomLib);
    for(const question of questions){
        await roomLib.updateAppend(room_id, 'questions', question);
    }
}

async function fullDeleteRoom(room_id){
    await roomLib.remove(room_id);
    await deletePlayersList(room_id);
}

module.exports = {
    appendQuestions,
    fullDeleteRoom,
    updateSetting,
    generatePin,
    updatePin,
    updatePlayersCount,
    updateActive,
}