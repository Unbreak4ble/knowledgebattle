const redis = require('./base/redis');

async function listPlayers(room_id){
    if(!(room_id && room_id.length > 0)) return;

    const key = 'rooms_players_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await connection.json.GET(key);

    await connection.quit();

    return data;
}

async function resetPlayersList(room_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_players_'+room_id;
    const connection = await redis.connect();

    await connection.json.SET(key, '$', []);

    await connection.quit();
}

async function addPlayer(room_id, player_data){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_players_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    await connection.json.ARRAPPEND(key, '$', player_data);

    await connection.quit();
}

async function removePlayer(room_id, player_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_players_'+room_id;
    const connection = await redis.connect();

    if(!await connection.json.GET(key, '$'))
        await connection.json.SET(key, '$', []);

    const data = await getPlayerById(room_id, player_id);

    if(data == null){
        await connection.quit();
        return;
    }
    
    const index = (await connection.json.ARRINDEX(key, '$', data))[0];

    if(index >= 0)
        await connection.json.ARRPOP(key, '$', index);

    await connection.quit();
}

async function getPlayerById(room_id, player_id){
    if(!(room_id && room_id.length > 0)) return;
    const key = 'rooms_players_'+room_id;
    const connection = await redis.connect();

    const data = await connection.json.GET(key, {
        path: `$[?(@.id == '${player_id}')]`
    });

    await connection.quit();

    return data[0];
}

module.exports = {
    listPlayers,
    addPlayer,
    removePlayer,
    getPlayerById,
    resetPlayersList,
}