// encryption.js
import crypto from 'crypto';

function encrypt(text) {
    const encrypted = crypto.AES.encrypt(text, process.env.GOOGLE_CLIENT_SECRET).toString();

    return encrypted;
}

function decrypt(encrypted) {
    const decrypted = crypto.AES.decrypt(encrypted, process.env.GOOGLE_CLIENT_SECRET)
    .toString(crypto.enc.Utf8)

    return decrypted;
}

module.exports = { encrypt, decrypt };
