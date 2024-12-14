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

async function addQuestion(room_id, question_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const question_data = {
        id: question_id,
        alternatives: []
    };

    await connection.json.ARRAPPEND(key, '$', question_data);

    await connection.quit();
}

async function getPlayerAlternative(room_id, question_id, player_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    let question = null;

    if((question = await getQuestionById(room_id, question_id)) == null)
        await addQuestion(room_id, question_id);

    const connection = await redis.connect();

    if(question == null){
        await connection.quit();
        return;
    }

    const data = question.alternatives.filter(x => x.player_id == player_id)[0];

    await connection.quit();

    return data;
}

async function addAlternative(room_id, question_id, alternative_data){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;

    if((await getQuestionById(room_id, question_id)) == null)
        await addQuestion(room_id, question_id);

    const connection = await redis.connect();

    const index = await getIndex(room_id, question_id);

    if(index == null || index < 0){
        await connection.quit();
        return;
    }
    
    await connection.json.ARRAPPEND(key, '$.['+index+'].alternatives', alternative_data);

    await connection.quit();
}

async function setAlternative(room_id, question_id, alternative_data){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;

    if((await getQuestionById(room_id, question_id)) == null)
        await addQuestion(room_id, question_id);

    const connection = await redis.connect();

    if((await getPlayerAlternative(room_id, question_id, alternative_data.player_id)) == null){
        await addAlternative(room_id, question_id, alternative_data);
    }else{
        const index = await getIndex(room_id, question_id);
        const alt_index = await getAlternativeIndex(room_id, question_id, alternative_data.player_id);
        await connection.json.SET(key, '$.['+index+'].alternatives.['+alt_index+']', alternative_data);
    }

    await connection.quit();
}

async function getQuestionById(room_id, question_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await connection.json.GET(key, {
        path: `$[?(@.id == ${question_id})]`
    });

    await connection.quit();

    return data[0];
}

async function getIndex(room_id, question_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;

    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await getQuestionById(room_id, question_id);

    if(data == null){
        await connection.quit();
        return;
    }

    const index = (await connection.json.ARRINDEX(key, '$', data))[0];

    await connection.quit();

    return index;
}

async function getAlternativeIndex(room_id, question_id, player_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_questions_'+room_id;

    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await getPlayerAlternative(room_id, question_id, player_id);

    if(data == null){
        await connection.quit();
        return;
    }

    const question_index = await getIndex(room_id, question_id);

    const index = (await connection.json.ARRINDEX(key, '$.['+question_index+'].alternatives', data))[0];

    await connection.quit();

    return index;
}

module.exports = {
    addQuestion,
    listQuestions,
    setAlternative,
    resetGlobalQuestionsList,
    resetQuestionsList,
    deleteQuestionsList,
    getQuestionById,
    getPlayerAlternative,
    addAlternative,
    getIndex
}