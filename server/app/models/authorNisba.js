const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const AuthorNisba = sequelize.define('authorNisba', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: Sequelize.STRING,
});

module.exports = AuthorNisba;
