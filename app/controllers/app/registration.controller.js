// app/controllers/app/registration.controller.js
const pool = require('@helpers/db.connect');
const { getHash } = require('@helpers/hasher');

exports.register = async (req, res) => {
    try {
        const { email, username, designation, tags, password } = req.body;
        const profilePic = req.file ? `/uploads/${req.file.filename}` : null; // Save the file path

        const hashedPassword = await getHash(password);

        const insertQuery = 'INSERT INTO Users (email, name, designation, tags, password, profile_pic) VALUES (?, ?, ?, ?, ?, ?)';

        pool.query(insertQuery, [email, username, designation, JSON.stringify(tags), hashedPassword, profilePic], (error, results) => {
            if (error) {
                console.error('Error inserting user into database:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
