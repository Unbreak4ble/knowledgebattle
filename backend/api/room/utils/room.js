const { updateInsert, updateAppend } = require("./database/room")


async function appendQuestions(room_id, questions){
    for(const question of questions){
        await updateAppend(room_id, 'questions', question);
    }
}

module.exports = {
    appendQuestions
}