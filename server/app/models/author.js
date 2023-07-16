const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Nisba = require('./nisba');
const Group = require('./group');
const AuthorNisba = require('./authorNisba');

const Author = sequelize.define(
    'author',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        aName: {
            type: Sequelize.STRING,
        },
        altName: Sequelize.STRING,
        aAltName: Sequelize.STRING,
        LCName: Sequelize.STRING,
        ALCName: Sequelize.STRING,
        aka: Sequelize.STRING,
        aAka: Sequelize.STRING,
        documentation: Sequelize.STRING,
        aDocumentation: Sequelize.STRING,
        dateDied: Sequelize.STRING,
        aDateDied: Sequelize.STRING,
        dateBorn: Sequelize.STRING,
        aDateBorn: Sequelize.STRING,
        // for search engine
        search_nisba: Sequelize.STRING,
        search_nisba_id: Sequelize.STRING,
    },
    {
        paranoid: true,
    }
);

Author.belongsToMany(Nisba, { through: AuthorNisba });
Author.belongsTo(Group);

module.exports = Author;
