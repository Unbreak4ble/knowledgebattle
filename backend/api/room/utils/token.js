const fs = require('fs');
const jwt = require('./jwt');

const secret = fs.readFileSync(__dirname+'/secret.txt', 'utf-8');

function validateToken(token){
    return jwt.verify(token, secret);
}

function createToken(room_id){
    return jwt.encode({"alg": "HS256", "typ": "JWT"}, {id: room_id}, secret);
}

module.exports = {
    validateToken,
    createToken
}