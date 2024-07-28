const pool = require('@helpers/db.connect');
const { deleteCookie } = require('@helpers/cookieHelper');

async function logout(req, res) {
    const sessionId = req.user.session_id; // Retrieve session_id from req.user set by auth.middleware

    try {
        // Update the session to set it as inactive
        const query = 'UPDATE UserSessions SET is_active = 0 WHERE session_id = ?';
        const connection = await pool.getConnection();
        await connection.execute(query, [sessionId]);
        connection.release();

        // Clear the session cookie
        deleteCookie(res, 'sessiontoken');

        // Redirect to the homepage
        res.redirect('/');
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: "Unknown error occurred during logout" });
    }
}

module.exports = logout;
