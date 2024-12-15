const { get } = require("./database/room");
const { getPlayerById } = require("./database/room_players");
const { setPlayerAlternative, setAlternative, getQuestionById, getPlayerAlternative } = require("./database/room_questions");


async function setPlayerAnswer(room_id, question_id, alternative_id, player_id){
    const player = await getPlayerById(room_id, player_id);
    const alternative_data = { player_id: player_id, alternative_id: alternative_id, player_name: player?.name || '[ghost]' };

    const room = await get(room_id);

    if(!room) return;
    if(question_id >= room.questions?.length) return;

    const last_alt = await getPlayerAlternative(room_id, question_id, player_id);

    if(last_alt && last_alt.alternative_id == alternative_id) return;

    await setAlternative(room_id, question_id, alternative_data, true); //increment

    if(last_alt){
        await setAlternative(room_id, question_id, last_alt, false); //decrement
    }

    await setPlayerAlternative(room_id, question_id, alternative_data);
}

async function getQuestionAlternatives(room_id, question_id){
    const question = await getQuestionById(room_id, question_id);

    if(question == null) return [];

    return question.alternatives;
}

async function getQuestionPlayersAlternatives(room_id, question_id){
    const question = await getQuestionById(room_id, question_id);

    if(question == null) return [];

    return question.players;
}

module.exports = {
    setPlayerAnswer,
    getQuestionAlternatives,
    getQuestionPlayersAlternatives
}