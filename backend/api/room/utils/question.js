const { setAlternative, getQuestionById } = require("./database/room_questions");


async function setPlayerAnswer(room_id, question_id, alternative_id, player_id){
    const alternative_data = { player_id: player_id, alternative_id: alternative_id };

    await setAlternative(room_id, question_id, alternative_data);
}

async function getQuestionAlternatives(room_id, question_id){
    const question = await getQuestionById(room_id, question_id);

    if(question == null) return [];

    return question.alternatives;
}

module.exports = {
    setPlayerAnswer,
    getQuestionAlternatives
}