const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Subject = sequelize.define(
    'subject',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        parentId: Sequelize.BIGINT,
        subject: {
            type: Sequelize.STRING,
        },
        aSubject: {
            type: Sequelize.STRING,
        },
    },
    {
        paranoid: true,
    }
);

module.exports = Subject;
