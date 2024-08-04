const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize('collabboard', 'myappuser', 'mypassword', {
      host: 'localhost',
      dialect: 'postgres',
    });

module.exports = sequelize;
