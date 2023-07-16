const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Nisba = sequelize.define(
    'nisba',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nisba: {
            type: Sequelize.STRING,
        },
        aNisba: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
        paranoid: true,
    }
);

module.exports = Nisba;
