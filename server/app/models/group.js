const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Group = sequelize.define(
    'group',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        parentId: Sequelize.BIGINT,
        name: {
            type: Sequelize.STRING,
        },
        aName: {
            type: Sequelize.STRING,
        },
        desc: Sequelize.STRING,
        aDesc: Sequelize.STRING,
        logo: Sequelize.STRING,
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        path: Sequelize.STRING,
    },
    {}
);

module.exports = Group;
