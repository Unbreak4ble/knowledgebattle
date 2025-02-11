const { hideProperties } = require('../../mappers/room');
const redis = require('./base/redis');

async function listPublic(max=100, hide=true){
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    const data = await connection.json.GET('rooms', {
        path: `$[?(@.settings[?(@.id == 'privacy.public' && @.allow == true)])]`
    });

    await connection.quit();

    const sliced = (data || []).slice(0, max);

    return hide ? sliced.map(x => hideProperties(x)) : sliced;
}

async function create(room){
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    await connection.json.ARRAPPEND('rooms', '$', room);

    await connection.quit();

    return (await get(room.id)) != null;
}

async function get(id){
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);
    
    const data = await connection.json.GET('rooms', {
        path: `$[?(@.id == '${id}')]`
    });

    await connection.quit();

    return data[0];
}

async function getByPin(pin){
    if(!/^[0-9]+$/gim.test(pin)) return;

    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    const data = await connection.json.GET('rooms', {
        path: `$[?(@.pin == ${pin})]`
    });

    await connection.quit();

    return data?.[0];
}

async function updateSet(id, key, value){
    const connection = await redis.connect();

    const index = await getIndex(id);

    if(!(index >= 0)){
        await connection.quit();
        return false;
    }

    await connection.json.SET('rooms', '$.['+index+'].'+key, value);

    await connection.quit();
    
    return true;
}

async function updateInsert(id, key, value){
    const connection = await redis.connect();

    const index = await getIndex(id);

    if(index < 0){
        await connection.quit();
        return;
    }

    await connection.json.ARRINSERT('rooms', '$.['+index+'].'+key, value);

    await connection.quit();
}

async function updateAppend(id, key, value){
    const connection = await redis.connect();

    const index = await getIndex(id);

    if(index < 0){
        await connection.quit();
        return;
    }

    await connection.json.ARRAPPEND('rooms', '$.['+index+'].'+key, value);

    await connection.quit();
}

async function getIndex(id){
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    const data = await get(id);

    if(data == null){
        await connection.quit();
        return;
    }

    const index = (await connection.json.ARRINDEX('rooms', '$', data))[0];

    await connection.quit();

    return index;
}

async function remove(id){
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    const data = await get(id);

    if(data == null){
        await connection.quit();
        return;
    }

    const index = (await connection.json.ARRINDEX('rooms', '$', data))[0];

    if(index >= 0){
        await connection.json.ARRPOP('rooms', '$', index);
    }

    await connection.quit();
}

async function updateQuestionSet(id, question_id, key, value){
    const connection = await redis.connect();

    const index = await getIndex(id);

    if(!(index >= 0)){
        await connection.quit();
        return false;
    }

    await connection.json.SET('rooms', '$.['+index+'].questions.['+(question_id)+'].'+key, value);

    await connection.quit();
    
    return true;
}

module.exports = {
    updateQuestionSet,
    listPublic,
    create,
    get,
    getByPin,
    updateSet,
    updateInsert,
    updateAppend,
    remove
}