const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

async function getHash(plainTextPassword) {
    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
    } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
    }
}


async function verify(plainTextPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        return match;
    } catch (err) {
        throw new Error('Error verifying password: ' + err.message);
    }
}

async function verifyagent(storedUserAgent, currentUserAgent) {
    return storedUserAgent === currentUserAgent;
}
module.exports = { getHash, verify,verifyagent };
