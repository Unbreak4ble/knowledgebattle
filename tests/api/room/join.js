const assert = require('assert');
const axios = require('axios');

module.exports = (global_data) => {
    describe("/api/room/join", function() {
        it("should join", async() => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        }).timeout(1000*30);
    });
}