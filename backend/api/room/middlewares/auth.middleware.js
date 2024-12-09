const { decode } = require("../utils/jwt");
const { validateToken } = require("../utils/token");

async function authMiddleware(req, res, next){
    const id = req.params.id || req.query.id;

    if(!id){
        return req.status(400).json({error: 'missing room id'});
    }

    const token = req.header['authorization'];

    if(!token){
        return req.status(404).json({error: 'missing authorization header'});
    }

    if(!validateToken(token)){
        return req.status(404).json({error: 'invalid or expired token'});
    }

    const [,payload] = decode(token);

    if(payload?.id != id){
        return req.status(404).json({error: "token doesn't match room"});
    }

    next();
}

module.exports = {
    authMiddleware
}