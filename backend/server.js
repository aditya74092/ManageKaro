const express = require('express');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Session = require('./models/Session');
const UserRoutes = require('./routes/users');
const SessionRoutes = require('./routes/sessions');
const AuthRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
}));

app.use(express.json());

// Database connection and model synchronization
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ force: false }); // Sync all models to the database
    })
    .then(() => {
        console.log('Database tables synced');
    })
    .catch(err => console.log('Error: ' + err));

// Routes
app.use('/users', auth, UserRoutes);        // Protect the users route
app.use('/sessions', auth, SessionRoutes);  // Protect the sessions route
app.use('/auth', AuthRoutes);               // Do not protect auth routes (login and register)

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Socket.IO handling
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (roomId) => {
        socket.join(roomId);
        console.log(`Client joined room: ${roomId}`);
    });

    socket.on('drawing', (data) => {
        const { x0, y0, x1, y1, color, lineWidth, roomId } = data;
        socket.to(roomId).emit('drawing', { x0, y0, x1, y1, color, lineWidth });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
