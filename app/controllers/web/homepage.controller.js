const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const users = require('@models/user.model');
const { slideSessionFrame } = require('@models/session.model');
const sessions = require('@models/session.model');
const bcrypt = require('bcrypt');

// Render the combined registration and login page
router.get('/', (req, res) => {
    res.render('./layouts/registerlogin.ejs',{layout:'./layouts/registerlogin'});
});

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = users.getUserByEmail(email);

    if (userExists) {
        return res.status(400).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
        isLocked: false
    };

    users.addUser(newUser);
    res.status(201).send('User registered successfully.');
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid email or password.');
    }

    // Assuming successful login, create a session
    const sessionId = uuidv4();
    const userAgent = req.header('user-agent');

    // Store session in your session model
    const newSession = {
        sessionId,
        userId: user._id,
        userAgent,
        expires: new Date(Date.now() + 30 * 60 * 1000) // Example: session expires in 30 minutes
    };

    sessions.addSession(newSession); // Add session to your session model

    res.cookie('sessionid', sessionId, { httpOnly: true }); // Set session ID cookie

    res.status(200).redirect('/admin'); // Redirect to /admin
});

module.exports = router;
