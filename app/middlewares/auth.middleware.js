const jwt = require('jsonwebtoken');
const getSessionById = require('@helpers/getSessionById');
const getUserBySessionId = require('@helpers/getUserBySessionId');
const slideExpiryWindow = require('@helpers/slideExpiryWindow');
const returner = require('@middlewares/return.middleware');
const { getCookie } = require('@helpers/cookieHelper');
const { verifyagent } = require('@helpers/hasher');

const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    const isApiOrNot = true;

    try {
        const token = getCookie(req, 'sessiontoken');
        console.log('Token:', token);
        if (!token) {
            return returner(1, res, isApiOrNot); // Token not found
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            console.log('Decoded:', decoded);
        } catch (err) {
            console.error('Token verification error:', err);
            return returner(4, res, isApiOrNot); // Token expired or invalid
        }

        const sessionId = decoded.sessionid; // Make sure this matches the field in the token
        console.log('Session ID:', sessionId);
        if (!sessionId) {
            console.error('session_id is undefined');
            return returner(0, res, isApiOrNot);
        }

        const sessions = await getSessionById(sessionId);
        console.log('Sessions:', sessions);
        if (!sessions || sessions.length === 0) {
            return returner(2, res, isApiOrNot); // Session not found
        }

        const storedUserAgent = sessions[0].user_agent;
        const currentUserAgent = req.headers['user-agent'];
        console.log('Stored User Agent:', storedUserAgent);
        console.log('Current User Agent:', currentUserAgent);

        const agent = await verifyagent(storedUserAgent, currentUserAgent);
        console.log('Agent Verification:', agent);
        if (!agent) {
            return returner(3, res, isApiOrNot); // Invalid user agent
        }

        if (!sessions[0].is_active) {
            return returner(3, res, isApiOrNot); // Session is inactive
        }

        if (new Date() > sessions[0].expiry_time) {
            return returner(4, res, isApiOrNot); // Session has expired
        }

        const user = await getUserBySessionId(sessionId);
        console.log('User:', user);
        if (!user || user.length === 0) {
            return returner(2, res, isApiOrNot); // User not found
        }

        if (user[0].is_locked) {
            return returner(5, res, isApiOrNot); // User is banned
        }

        await slideExpiryWindow(sessionId);
        console.log('Session expiry updated');

        req.user = { ...user[0], session_id: sessionId };

        next();
    } catch (err) {
        console.error('Authentication error:', err);
        return returner(0, res, isApiOrNot); // Unknown error
    }
}

module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');
// const getSessionById = require('@helpers/getSessionById');
// const getUserBySessionId = require('@helpers/getUserBySessionId');
// const slideExpiryWindow = require('@helpers/slideExpiryWindow');
// const returner = require('@middlewares/return.middleware');
// const { getCookie } = require('@helpers/cookieHelper');
// const { verifyagent } = require('@helpers/hasher');

// const JWT_SECRET = process.env.JWT_SECRET;

// async function authMiddleware(req, res, next) {
//     const isApiOrNot = true;

//     try {
//         const token = getCookie(req, 'sessiontoken');
//         if (!token) {
//             return returner(1, res, isApiOrNot); // Token not found
//         }

//         let decoded;
//         try {
//             decoded = jwt.verify(token, JWT_SECRET);
//         } catch (err) {
//             console.error('Token verification error:', err);
//             return returner(4, res, isApiOrNot); // Token expired or invalid
//         }

//         const sessionId = decoded.sessionid;
//         if (!sessionId) {
//             return returner(0, res, isApiOrNot);
//         }

//         const sessions = await getSessionById(sessionId);
//         if (!sessions || sessions.length === 0) {
//             return returner(2, res, isApiOrNot); // Session not found
//         }

//         const storedUserAgent = sessions[0].user_agent;
//         const currentUserAgent = req.headers['user-agent'];

//         const agent = await verifyagent(storedUserAgent, currentUserAgent);
//         if (!agent) {
//             return returner(3, res, isApiOrNot); // Invalid user agent
//         }

//         if (!sessions[0].is_active) {
//             return returner(3, res, isApiOrNot); // Session is inactive
//         }

//         if (new Date() > sessions[0].expiry_time) {
//             return returner(4, res, isApiOrNot); // Session has expired
//         }

//         const user = await getUserBySessionId(sessions[0].user_id);
//         if (!user || user.length === 0) {
//             return returner(2, res, isApiOrNot); // User not found
//         }

//         if (user[0].is_locked) {
//             return returner(5, res, isApiOrNot); // User is banned
//         }

//         await slideExpiryWindow(sessionId);

//         req.user = { ...user[0], session_id: sessionId };

//         next();
//     } catch (err) {
//         console.error('Authentication error:', err);
//         return returner(0, res, isApiOrNot); // Unknown error
//     }
// }

// module.exports = authMiddleware;
