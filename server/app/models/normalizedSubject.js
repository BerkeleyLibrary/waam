const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const NormalizedSubject = sequelize.define(
    'normalizedSubject',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        english: Sequelize.STRING,
        arabic: Sequelize.STRING,
        seeAlso: Sequelize.STRING,
        see: Sequelize.STRING,
        includes: Sequelize.STRING,
        parent: Sequelize.STRING,
        count: Sequelize.INTEGER,
    },
    {}
);

module.exports = NormalizedSubject;
