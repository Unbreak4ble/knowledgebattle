
function mountResponse(type, data){
    return {type: type, data: data};
}

function mountRequestFailed(message){
    const data = {
        message: message
    };

    return mountResponse('request_failed', data);
}

module.exports = {
    mountResponse,
    mountRequestFailed
}