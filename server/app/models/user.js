const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const User = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.TEXT,
        admin: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
    },
    {
        instanceMethods: {
            toJSON: function() {
                const values = Object.assign({}, this.get());
                delete values.password;
                return values;
            },
        },
    }
);

module.exports = User;
