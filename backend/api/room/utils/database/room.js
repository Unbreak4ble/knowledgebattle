const redis = require('./base/redis');

async function listPublic(max=100){
    const connection = await redis.connect();

    const data = await connection.json.GET('rooms', `$[?(@.settings[?(@.id == 'privacy.public' && @.allow == true)])]`);
    //const data = await connection.call('JSON.GET', 'rooms', `$[?(@.settings[?(@.id == 'privacy.public' && @.allow == true)])]`);

    await connection.quit();

    return (data || []).slice(0, max);
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

    const index = await connection.json.ARRINDEX('rooms', '$.id', id);

    const data = await connection.json.GET('rooms', `$.[${index}]`);

    await connection.quit();

    return data;
}

async function update(id, room){

}

async function remove(id){
    const connection = await redis.connect();

    const index = await connection.json.ARRINDEX('rooms', '$.id', id);

    if(index >= 0){
        await connection.json.ARRPOP('rooms', '$', index);
    }

    await connection.quit();
}

module.exports = {
    listPublic,
    create,
    get,
    update,
    remove
}