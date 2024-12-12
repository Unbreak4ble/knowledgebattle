const redis = require('./base/redis');

function hideProperties(room){
    if(!room) return room;

    room.questions = undefined;
    room.settings = undefined;

    return room;
}

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
    const connection = await redis.connect();

    if(!await connection.json.GET('rooms', '$'))
        await connection.json.SET('rooms', '$', []);

    const data = await connection.json.GET('rooms', {
        path: `$[?(@.pin == ${pin})]`
    });

    await connection.quit();

    return data[0];
}

async function updateSet(id, key, value){
    const connection = await redis.connect();

    const index = await getIndex(id);

    if(index < 0){
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

module.exports = {
    hideProperties,
    listPublic,
    create,
    get,
    getByPin,
    updateSet,
    updateInsert,
    updateAppend,
    remove
}