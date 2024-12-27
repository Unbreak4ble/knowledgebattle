var global_data = {
    target_url: 'http://localhost:8080',
    output: {
        join_stats: {
            received: 0,
            recognized: 0
        },
        created_rooms: [],
        admins_connections: [],
        users_connections: [],
        room: null
    },
};

describe("API Testing", function() {
    require("./room/create")(global_data);
    require("./room/fetch")(global_data);
    require("./room/list")(global_data);
    require("./room/join")(global_data);
    require("./room/delete")(global_data);
});