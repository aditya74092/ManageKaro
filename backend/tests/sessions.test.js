const request = require('supertest');
const app = require('../server'); // Ensure you export your app from server.js
const sequelize = require('../config/database');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync and reset database
});

describe('Session Endpoints', () => {
    let token;
    beforeAll(async () => {
        const userRes = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        const loginRes = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        token = loginRes.body.token;
    });

    it('should save a session', async () => {
        const res = await request(app)
            .post('/sessions/save')
            .set('x-auth-token', token)
            .send({
                data: JSON.stringify({ lines: [] }),
                roomId: 'testroom'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should load a session', async () => {
        const res = await request(app)
            .get('/sessions/load/testroom')
            .set('x-auth-token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });
});
