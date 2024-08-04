const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
