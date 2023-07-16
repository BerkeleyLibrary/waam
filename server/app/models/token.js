const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Token = sequelize.define(
    'token',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        token: Sequelize.STRING,
        uid: Sequelize.BIGINT,
    },
    {
        timestamps: false,
    }
);

module.exports = Token;
