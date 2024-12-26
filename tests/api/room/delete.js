const assert = require('assert');
const axios = require('axios');

module.exports = (global_data) => {
    const endpoint = "/api/room/delete";

    describe(endpoint, function() {
        it("should delete created rooms", async() => {
            for(const created_room of global_data.output.created_rooms){
                //console.log('deleting', created_room.id);

                const request = {
                    method: "DELETE",
                    url: global_data.target_url+endpoint+'/'+created_room.id,
                    headers: {
                        'content-type': 'application/json',
                        'authorization': created_room.token
                    }
                };

                const response = await axios(request);

                assert.equal(response.status, 200);
            }
        }).timeout(1000*30);
    });
}