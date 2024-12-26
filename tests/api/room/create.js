const assert = require('assert');
const axios = require('axios');

module.exports = (global_data) => {
    const endpoint = '/api/room/create';
    global_data.output.created_rooms = [];

    describe(endpoint, function() {
        it("should create", async() => {
            const payload = {
                text: "test room",
                settings: [
                    {id: "ingame.visibility.result_poll", allow: false},
                    {id: "privacy.public", allow: true},
                    {id: "ingame.time.wait_for_all", allow: true},
                    {id: "ingame.allow_join", allow: true},
                    {id: "ingame.show_previous", allow: false}
                ],
                questions: [
                    {
                        id: 1,
                        text: "room question",
                        alternatives: [
                            {text: "room question alternative text"}
                        ],
                        correct: -1,
                        finished: false
                    },
                ]
            };

            const request = {
                method: "POST",
                url: global_data.target_url+endpoint,
                headers: {
                    'content-type': 'application/json'
                },
                data: payload
            };

            let response = {};
            try{
                response = await axios(request);
            }catch(err){
                response = err.response;
            }

            assert.equal(response.status, 200);

            const data = response.data;

            assert.notEqual(data, null);
            assert.notEqual(data.token, null);
            assert.notEqual(data.id, null);
            assert.notEqual(data.pin, null);

            global_data.output.created_rooms.push(data);
        }).timeout(1000*30);

        it("should rate limit", async() => {
            const createIt = async () => {
                const payload = {
                    text: "test room",
                    settings: [
                        {id: "ingame.visibility.result_poll", allow: false},
                        {id: "privacy.public", allow: true},
                        {id: "ingame.time.wait_for_all", allow: true},
                        {id: "ingame.allow_join", allow: true},
                        {id: "ingame.show_previous", allow: false}
                    ],
                    questions: [
                        {
                            id: 1,
                            text: "room question",
                            alternatives: [
                                {text: "room question alternative text"}
                            ],
                            correct: -1,
                            finished: false
                        },
                    ]
                };

                const request = {
                    method: "POST",
                    url: global_data.target_url+endpoint,
                    headers: {
                        'content-type': 'application/json'
                    },
                    data: payload
                };

                let response = {};
                try{
                    response = await axios(request);
                }catch(err){
                    response = err.response;
                }

                if(response.status != 200) return [false, response];

                const data = response.data;

                global_data.output.created_rooms.push(data);

                return [true, response];
            };

            // mass creation testing
            for(let i=0; i<=100; i++){
                let result = await createIt();

                // current rate limit is 10
                if(i > 10){
                    assert.equal(result[0] == false && result[1].status == 429, true);
                    return;
                }
            }
        }).timeout(1000*30);
    });
}