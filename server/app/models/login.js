const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const User = require('./user');

const Login = sequelize.define(
    'login',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        loginType: Sequelize.INTEGER,
        ip: Sequelize.TEXT,
    },
    {}
);

Login.belongsTo(User);

module.exports = Login;
