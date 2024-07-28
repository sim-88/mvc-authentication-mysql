const pool = require('@helpers/db.connect');

async function getSessionById(sessionId) {
    try {
        const [rows] = await pool.execute('SELECT * FROM UserSessions WHERE session_id = ?', [sessionId]);
        return rows;
    } catch (error) {
        console.error('Error fetching session by ID:', error);
        throw error;
    }
}

module.exports = getSessionById;
