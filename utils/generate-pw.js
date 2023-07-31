import { generate } from "generate-password";

function generateRandomPassword() {
    // Generate random lenght from 10 to 15
    let randomLen = Math.floor(Math.random() * 6) + 10;


    return generate({
        length: randomLen,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true
    });
}

module.exports = { generateRandomPassword };