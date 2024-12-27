const assert = require('assert');
const axios = require('axios');
const { WebSocket } = require('ws');

module.exports = (global_data) => {
    const endpoint = "/api/room/join";
    describe(endpoint+'?pin={pin}', function() {
        it("should join in created rooms", async() => {
            for(const created_room of global_data.output.created_rooms){
                const connection = new WebSocket(global_data.target_url+endpoint+'/'+created_room.pin);
                const data = { room:created_room, connection: connection, received: 0 };

                connection.on('open', () => {
                    global_data.output.admins_connections.push(data);
                });

                connection.on('message', (msg) => {
                    const msg_utf8 = Buffer.from(msg).toString('utf-8');
                    const parsed = JSON.parse(msg_utf8);

                    if(parsed.type != 'request') return;

                    ++global_data.output.join_stats.received;
                });
            }

            await new Promise(resolve => setTimeout(resolve, 3*1000));

            assert.equal(global_data.output.admins_connections.length, global_data.output.created_rooms.length);
            
        }).timeout(1000*10);

        it("should receive 'recognition request' message", async() => {
            assert.equal(global_data.output.join_stats.received, global_data.output.admins_connections.length);
        }).timeout(1000*10);

        it("should authenticate as admin", async() => {
            for(const connection of global_data.output.admins_connections){
                connection.connection.on('message', (msg) => {
                    const msg_utf8 = Buffer.from(msg).toString('utf-8');
                    const parsed = JSON.parse(msg_utf8);

                    if(parsed.type != 'recognition') return;

                    ++global_data.output.join_stats.recognized;
                });

                const payload = {
                    name: 'testingAdmin',
                    token: connection.room.token
                };

                connection.connection.send(JSON.stringify(payload));
            }

            await new Promise(resolve => setTimeout(resolve, 5*1000));

            assert.equal(global_data.output.join_stats.recognized, global_data.output.admins_connections.length);
        }).timeout(1000*10);

        it("should close connections", async() => {
            let closed = 0;
            for(const connection of global_data.output.admins_connections){
                connection.connection.on('close', (data) => {
                    ++closed;
                });
                connection.connection.close();
            }

            await new Promise(resolve => setTimeout(resolve, 5*1000));

            assert.equal(closed, global_data.output.admins_connections.length);
        }).timeout(1000*10);

    });
}