const { hideProperties } = require("../mappers/question");
const roomLib = require("./database/room");
const { deletePlayersList, listPlayers } = require("./database/room_players");
const { deleteQuestionsList } = require("./database/room_questions");

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
    const count = (await listPlayers(room_id))?.length || 0;
    
    await roomLib.updateSet(room_id, 'players_count', count);
}

async function updateCurrentQuestionId(room_id, question_id){
    await roomLib.updateSet(room_id, 'current_question_id', question_id);
}

async function updateSetting(room_id, setting){
    const room = await getRoom(room_id);

    if(room == null) return;

    const settings = room.settings.map(x => (x.id == setting.id ? (x.allow = setting.allow) : 0, x));

    await roomLib.updateSet(room_id, 'settings', settings);
}

async function appendQuestions(room_id, questions){
    for(const question of questions){
        await roomLib.updateAppend(room_id, 'questions', question);
    }
}

async function fullDeleteRoom(room_id){
    await deletePlayersList(room_id);
    await deleteQuestionsList(room_id);
    await roomLib.remove(room_id);
}

async function getCurrentQuestion(room_id, hide=false){
    const room = await getRoom(room_id);

    if(room == null) return null;

    let question = room.questions[room.current_question_id];

    if(hide)
        question = await hideProperties(question);

    return question;
}

async function updateTimeout(room_id, timeout){
    await roomLib.updateSet(room_id, 'question_timeout', timeout);
}

async function resetRoomQuestions(room_id){
    await roomLib.updateSet(room_id, 'questions', []);
}

async function getRoom(room_id){
    const data = await roomLib.get(room_id);

    if(data == null) return null;

    const now = Math.floor(Date.now()/1000);

    if(now >= data.expire_timestamp){
        await fullDeleteRoom(room_id);
        
        return null;
    }

    return data;
}

async function listPublicRooms(){
    return await roomLib.listPublic();
}

module.exports = {
    listPublicRooms,
    getRoom,
    resetRoomQuestions,
    updateTimeout,
    appendQuestions,
    fullDeleteRoom,
    updateSetting,
    generatePin,
    updatePin,
    updatePlayersCount,
    updateActive,
    getCurrentQuestion,
    updateCurrentQuestionId,
}