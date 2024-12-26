const assert = require('assert');
const axios = require('axios');

module.exports = (global_data) => {
    const endpoint = '/api/room/fetch';

    describe(endpoint+"/{id}", function() {
        it("should fetch created rooms", async() => {
            for(const created_room of global_data.output.created_rooms){
                const request = {
                    method: "GET",
                    url: global_data.target_url+endpoint+'/'+created_room.id,
                    headers: {
                        'content-type': 'application/json',
                        'authorization': created_room.token
                    }
                };

                const response = await axios(request);

                assert.equal(response.status, 200);

                const data = response.data;

                global_data.output.id_room_data = data;
            }
        }).timeout(1000*30);
    });

    describe(endpoint + "/pin/{pin}", function() {
        it("should fetch created rooms", async() => {
            for(const created_room of global_data.output.created_rooms){
                const response = await axios.get(global_data.target_url+endpoint+'/pin/'+created_room.pin);
                
                assert.equal(response.status, 200);

                const data = response.data;

                global_data.output.pin_room_data = data;
            }
        }).timeout(1000*30);
    });
}