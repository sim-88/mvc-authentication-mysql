const sessions = [
    { 
        sessionId: '2rcIH9jC934Mmoycg4i49d0OnEsoQ4Gh', 
        userId: '12345', 
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', 
        expires: new Date(Date.now() + 30 * 60 * 1000) 
    },
    { 
        sessionId: '3AbCdEfGhIjKlMnOpQrStUvWxYz', 
        userId: '67890', 
        userAgent: 'Chrome/91.0.4472.124', 
        expires: new Date(Date.now() + 30 * 60 * 1000) 
    }, 
    { 
        sessionId: 'aBcDeFgHiJkLmNoPqRsTuVwXyZ', 
        userId: '54321', 
        userAgent: 'Safari/14.1.1', 
        expires: new Date(Date.now() + 30 * 60 * 1000) 
    }, 
    { 
        sessionId: '1a2b3c4d5e6f7g8h9i0j', 
        userId: '98765', 
        userAgent: 'Firefox/89.0', 
        expires: new Date(Date.now() + 30 * 60 * 1000) 
    }, 
    { 
        sessionId: 'qwertyuiopasdfghjklzxcvbnm', 
        userId: '24680', 
        userAgent: 'Edge/91.0.864.59', 
        expires: new Date(Date.now() + 120 * 60 * 1000) 
    }, 
];

exports.getSessionById = (id) => {
    return sessions.find(session => session.sessionId === id);
};

exports.slideSessionFrame = (sessionId) => {
    const session = sessions.find(session => session.sessionId === sessionId);
    if (session) {
        session.expires = new Date(Date.now() + 30 * 60 * 1000); // Extend session by 30 minutes
    }
    return session;
};

exports.addSession = (session) => {
    sessions.push(session);
};

