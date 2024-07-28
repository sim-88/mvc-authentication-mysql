const pool = require('@helpers/db.connect');

async function slideExpiryWindow(sessionId) {
    const query = `
        UPDATE UserSessions
        SET expiry_time = DATE_ADD(NOW(), INTERVAL 30 MINUTE)
        WHERE session_id = ?
    `;

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(query, [sessionId]);
        connection.release();

        if (result.affectedRows === 0) {
            throw new Error('Session not found or expiry time not updated.');
        }

        console.log('Session expiry time updated successfully.');
        return result;
    } catch (err) {
        console.error('Error sliding expiry window:', err);
        throw err;
    }
}

module.exports = slideExpiryWindow;
