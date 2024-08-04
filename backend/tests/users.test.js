const request = require('supertest');
const app = require('../server'); // Ensure you export your app from server.js
const sequelize = require('../config/database');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync and reset database
});

describe('User Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
