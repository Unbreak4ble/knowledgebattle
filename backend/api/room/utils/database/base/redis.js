const redis = require("redis");

const connect = () => new Promise(async resolve => {
	const client = redis.createClient({
		url: "redis://redisdb"
	});
	let connected = false;

	client.on("ready", () => connected = true);

	await client.connect();

    if(connected){
        resolve(client);
    }else{
        resolve(null);
    }
});


module.exports = {
	connect
}