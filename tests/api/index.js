var global_data = {
    target_url: 'http://localhost:8080',
    output: {
        created_rooms: [],
        room: null
    },
};

describe("API Testing", function() {
    require("./room/create")(global_data);
    require("./room/fetch")(global_data);
    require("./room/list")(global_data);
    require("./room/update")(global_data);
    require("./room/delete")(global_data);
});