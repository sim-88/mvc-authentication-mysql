const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getHash, verify } = require('@helpers/hasher'); // Adjust the path as needed
const jwt = require('jsonwebtoken');
const pool = require('@helpers/db.connect'); // Adjust the path as needed

router.use(bodyParser.json());

router.post('/api/login', async (req, res) => {
    try {
        const details = req.body;
        const query = "SELECT * FROM Users WHERE email = ?";
        const values = [details.email];

        const [rows] = await pool.query(query, values);
        
        if (rows.length) {
            const user = rows[0];
            const legitUser = await verify(details.password, user.password); // Changed column name to 'password'

            if (!legitUser) {
                res.status(401).send({ message: "Email and password do not match" });
            } else {
                const sessionid = await insertSession(user, req, res);
                res.status(200).send({ message: `User logged in successfully ${sessionid}` });
            }
        } else {
            res.status(401).send({ message: "User does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});

async function insertSession(user, req, res) {
    try {
        const userAgent = req.headers['user-agent'];
        const userAgentHash = await getHash(userAgent); // If you still need to hash it
        const expiryTime = new Date(Date.now() + 30 * 60 * 1000);
        const values = [user.user_id, userAgent, expiryTime];
        const query = "INSERT INTO UserSessions (user_id, user_agent, expiry_time) VALUES (?, ?, ?)";

        const [result] = await pool.query(query, values);

        if (result.affectedRows) {
            const token = jwt.sign({ sessionid: result.insertId }, process.env.JWT_SECRET);
            res.cookie('sessiontoken', token);
            return result.insertId;
        } else {
            res.status(401).send({ message: "Cannot create session currently." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = router;
