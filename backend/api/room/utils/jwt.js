const b64 = require('./base64');
const crypto = require('crypto');

function encode(header={"alg": "HS256", "typ": "JWT"}, payload, key){
    const header_b64 = b64.base64URLencode(JSON.stringify(header));
    const payload_b64 = b64.base64URLencode(JSON.stringify(payload));
    const key_raw = new Buffer(key, 'utf8');
    const signature_b64 = crypto.createHmac('sha256', key_raw).update(header_b64+'.'+payload_b64).digest('base64url');

    return [header_b64, payload_b64, signature_b64].join('.');
}

function decode(token){
    const [header, payload] = token.split('.');

    return [JSON.parse(b64.base64URLdecode(header)), JSON.parse(b64.base64URLdecode(payload))];
}

function verify(token, key){
    const [header_b64, payload_b64, signature_b64] = token.split('.');
    const key_raw = new Buffer(key, 'utf8');
    const generated_signature_b64 = crypto.createHmac('sha256', key_raw).update(header_b64+'.'+payload_b64).digest('base64url');

    return signature_b64 == generated_signature_b64;
}

module.exports = {
    encode,
    decode,
    verify
}