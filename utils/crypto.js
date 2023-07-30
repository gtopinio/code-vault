import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

function encrypt(text, key, iv) {
    // Convert the key and iv from JSON to buffers
    key = Buffer.from(Object.values(key.data));
    iv = Buffer.from(Object.values(iv.data));

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decrypt(encrypted, key, iv) {
    // Convert the key and iv from JSON to buffers
    key = Buffer.from(Object.values(key.data));
    iv = Buffer.from(Object.values(iv.data));

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function generateKey(){
    const key = crypto.randomBytes(32); // Generate a random key of 32 bytes (256 bits)
    return key.toJSON();
}

function generateIV(){
    const iv = crypto.randomBytes(16); // Generate a random IV of 16 bytes (128 bits)
    return iv.toJSON();
}

module.exports = { encrypt, decrypt, generateKey, generateIV };
