const assert = require('assert');
const axios = require('axios');

module.exports = (global_data) => {
    const endpoint = "/api/room/list";

    describe(endpoint, function() {
        it("should list", async() => {
            const response = await axios.get(global_data.target_url+endpoint);
            
            assert.equal(response.status, 200);

            const data = response.data;

            global_data.output.rooms_list = data;

            assert.equal(data.length, global_data.output.created_rooms.length);
        }).timeout(1000*30);
    });
}