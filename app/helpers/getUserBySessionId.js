const pool = require('@helpers/db.connect');


async function getUserBySessionId(sessionId) {
    const query = `
        SELECT Users.* FROM Users
        JOIN UserSessions ON Users.user_id = UserSessions.user_id
        WHERE UserSessions.session_id = ?
    `;

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(query, [sessionId]);
        connection.release();
        return rows;
    } catch (err) {
        console.error('Error fetching user by session ID:', err);
        throw err;
    }
}

module.exports = getUserBySessionId;
