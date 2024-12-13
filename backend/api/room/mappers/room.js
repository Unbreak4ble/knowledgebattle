
function hideProperties(room){
    if(!room) return room;

    room.questions = undefined;
    //room.settings = undefined;

    return room;
}

module.exports = {
    hideProperties
}