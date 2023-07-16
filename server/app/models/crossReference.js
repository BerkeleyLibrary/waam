const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const CrossReference = sequelize.define(
    'crossReference',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        keyword: Sequelize.INTEGER,
        target: Sequelize.TEXT,
        type: Sequelize.TEXT,
    },
    {}
);

module.exports = CrossReference;
