import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // You can choose a different algorithm if needed
const key = process.env.GOOGLE_CLIENT_SECRET
const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)


function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = { encrypt, decrypt };
