const Sequelize = require('sequelize');
const db = require('../config/database');

const sequelize = new Sequelize(db.connectionString, {
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
    },
});

module.exports = sequelize;
