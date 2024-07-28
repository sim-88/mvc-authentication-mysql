const { v4: uuidv4 } = require('uuid');

function generateDeviceId() {
    return uuidv4();
}

module.exports = generateDeviceId;
