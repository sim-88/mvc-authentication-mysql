const cookieParser = require('cookie-parser');

function setCookie(res, name, value, options = {}) {
    res.cookie(name, value, options);
}

function getCookie(req, name) {
    return req.cookies[name];
}


function deleteCookie(res, name, options = {}) {
    res.clearCookie(name, options);
}

module.exports = {
    setCookie,
    getCookie,
    deleteCookie
};
