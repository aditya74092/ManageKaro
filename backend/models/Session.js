const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // Ensure this is lowercase
            key: 'id'
        }
    },
    roomId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'sessions' // Ensure this is lowercase
});

module.exports = Session;
