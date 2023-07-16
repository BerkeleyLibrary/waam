const Sequelize = require('sequelize');

const sequelize = require('../sequelize-factory');

const Author = require('./author');

const Group = require('./group');

const Subject = require('./subject');

const ManuscriptAuthor = require('./manuscriptAuthor');

const Manuscript = sequelize.define(
    'manuscript',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        title: Sequelize.STRING,
        aTitle: Sequelize.STRING,
        altTitle: Sequelize.STRING,
        aAltTitle: Sequelize.STRING,
        attrTitle: Sequelize.STRING,
        aAttrTitle: Sequelize.STRING,
        documentation: Sequelize.STRING,
        aDocumentation: Sequelize.STRING,
        collection: Sequelize.STRING,
        form: Sequelize.STRING,
        aForm: Sequelize.STRING,
        recp: Sequelize.STRING,
        aRecp: Sequelize.STRING,
        recpGrp: Sequelize.STRING,
        aRecpGrp: Sequelize.STRING,
        req: Sequelize.STRING,
        aReq: Sequelize.STRING,
        copyist: Sequelize.STRING,
        aCopyist: Sequelize.STRING,
        copiedAt: Sequelize.STRING,
        aCopiedAt: Sequelize.STRING,
        copiedDate: Sequelize.STRING,
        aCopiedDate: Sequelize.STRING,
        composed: Sequelize.STRING,
        owner: Sequelize.STRING,
        aOwner: Sequelize.STRING,
        pages: Sequelize.STRING,
        dims: Sequelize.STRING,
        lang: Sequelize.STRING,
        condition: Sequelize.STRING,
        aCondition: Sequelize.STRING,
        misc: Sequelize.TEXT,
        aMisc: Sequelize.TEXT,
        aFirstLine: Sequelize.TEXT,
        aLastLine: Sequelize.TEXT,
        login: Sequelize.INTEGER,
        added_by: Sequelize.INTEGER,
        source: Sequelize.STRING,
        approved: Sequelize.INTEGER,
        onlineCopy: Sequelize.STRING,
        onlineLabel: Sequelize.STRING,
        search_title: Sequelize.TEXT,
        search_author: Sequelize.TEXT,
        search_author_aka: Sequelize.TEXT,
        search_author_date_died: Sequelize.TEXT,
        search_author_nisba: Sequelize.TEXT,
        search_subject: Sequelize.TEXT,
        search_author_id: Sequelize.TEXT,
        search_author_nisba_id: Sequelize.TEXT,
    },
    { paranoid: true }
);

Manuscript.belongsToMany(Author, { through: ManuscriptAuthor });
Author.belongsToMany(Manuscript, { through: ManuscriptAuthor });
Manuscript.belongsTo(Group);
Manuscript.belongsTo(Subject);

module.exports = Manuscript;
