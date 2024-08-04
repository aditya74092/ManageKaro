const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const auth = require('../middleware/auth');

// Save session with roomId and userId
router.post('/save', auth, async (req, res) => {
    const { data, roomId } = req.body;
    const userId = req.user.id;

    if (!data || !roomId) {
        return res.status(400).json({ error: 'Data and roomId are required' });
    }

    try {
        const newSession = await Session.create({ userId, data, roomId });
        res.json(newSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Load session by roomId
router.get('/load/:roomId', auth, async (req, res) => {
    try {
        const sessions = await Session.findAll({ where: { roomId: req.params.roomId } });
        if (!sessions.length) {
            return res.status(404).json({ error: 'No sessions found for this roomId' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
