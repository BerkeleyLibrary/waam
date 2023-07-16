const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const ManuscriptAuthor = sequelize.define('manuscriptAuthor', {
    status: Sequelize.STRING,
});

module.exports = ManuscriptAuthor;
