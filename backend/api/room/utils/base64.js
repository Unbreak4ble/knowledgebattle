
function base64URLencode(str) {
  const base64Encoded = btoa(str);
  return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64URLdecode(str) {
  const base64Encoded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const base64WithPadding = base64Encoded + padding;
  return atob(base64WithPadding)
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0)))
    .join('');
}

module.exports = {
    base64URLdecode,
    base64URLencode
}  