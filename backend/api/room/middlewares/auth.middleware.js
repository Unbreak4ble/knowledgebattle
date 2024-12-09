const { decode } = require("../utils/jwt");
const { validateToken } = require("../utils/token");

async function authMiddleware(req, res, next){
    const id = req.params.id || req.query.id;

    if(!id){
        return res.status(400).json({error: 'missing room id'});
    }

    const token = req.headers['authorization'];

    if(!token){
        return res.status(404).json({error: 'missing authorization header'});
    }

    if(!validateToken(token)){
        return res.status(404).json({error: 'invalid or expired token'});
    }

    const [,payload] = decode(token);

    if(payload?.id != id){
        return res.status(404).json({error: "token doesn't match the room"});
    }

    next();
}

module.exports = {
    authMiddleware
}