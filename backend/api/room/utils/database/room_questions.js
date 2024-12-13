const redis = require('./base/redis');

async function listQuestions(room_id){
    if(!(room_id && room_id.length > 0)) return;

    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await connection.json.GET(key);

    await connection.quit();

    return data;
}

async function resetGlobalQuestionsList(){
    const key_prefix = 'rooms_questions_';

    const connection = await redis.connect();

    const keys = await connection.KEYS('*');

    const filtered_keys = keys.filter(x => x.startsWith(key_prefix));

    for(const key of filtered_keys){
        await connection.DEL(key);
    }

    await connection.quit();
}

async function resetQuestionsList(room_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    await connection.json.SET(key, '$', []);

    await connection.quit();
}

async function deleteQuestionsList(room_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    await connection.json.DEL(key);

    await connection.quit();
}

async function addQuestion(room_id, question_data){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    await connection.json.ARRAPPEND(key, '$', question_data);

    await connection.quit();
}

async function getQuestionById(room_id, question_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    const data = await connection.json.GET(key, {
        path: `$[?(@.id == '${question_id}')]`
    });

    await connection.quit();

    return data[0];
}

module.exports = {
    addQuestion,
    listQuestions,
    resetGlobalQuestionsList,
    resetQuestionsList,
    deleteQuestionsList,
    getQuestionById
}