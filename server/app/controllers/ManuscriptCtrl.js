const Sequelize = require('sequelize');
const {
    Manuscript,
    Group,
    Author,
    Subject,
    Nisba,
} = require('../models/index');

const Op = Sequelize.Op;

const {
    search,
    getQueryParts,
    removeArabicDiacritics,
} = require('../utils/db-query');

const searchValue = (...values) =>
    values.filter(Boolean).map(removeArabicDiacritics).join('\n');

module.exports = {
    index: (req, res) => {
        const {
            admin,
            query: queryString,
            advanced: isAdvanced,
            fieldName: searchField,
            showLastUpdated,
        } = req.query;

        const queries = [];

        // TODO: improve this.
        // If admin, show hidden records.
        if (admin !== 'true') {
            queries.push({
                query: 'y',
                fieldName: 'hidden',
            });
        }

        if (queryString && queryString.trim()) {
            queries.push({
                query: queryString,
                fieldName: searchField,
            });
        }

        if (isAdvanced) {
            const queryString_1 = req.query.query_1;

            const queryString_2 = req.query.query_2;

            if (queryString_1 && queryString_1.trim()) {
                queries.push({
                    query: queryString_1,
                    fieldName: req.query.fieldName_1,
                });
            }

            if (queryString_2 && queryString_2.trim()) {
                queries.push({
                    query: queryString_2,
                    fieldName: req.query.fieldName_2,
                });
            }
        }

        const where = [];
        const groupWhere = [];

        queries.forEach((queryObject) => {
            const queryParts = getQueryParts(queryObject.query);
            const whereOr = queryParts.map((part) => {
                return { [Op.like]: `%${part}%` };
            });

            switch (queryObject.fieldName) {
                case 'waamdId':
                    where.push({ id: queryObject.query });
                    break;
                case 'hidden':
                    where.push({ hidden: null });
                    break;
                case 'title':
                    where.push({ search_title: { [Op.and]: whereOr } });
                    break;
                case 'subject':
                    where.push({ search_subject: { [Op.and]: whereOr } });
                    break;
                case 'subjectId':
                    where.push({ subjectId: queryObject.query });
                    break;
                case 'author':
                    where.push({ search_author: { [Op.and]: whereOr } });
                    break;
                case 'authorId':
                    where.push({
                        search_author_id: {
                            [Op.like]: `%[${queryObject.query.trim()}]%`,
                        },
                    });
                    break;
                case 'nisba':
                    where.push({ search_author_nisba: { [Op.and]: whereOr } });
                    break;
                case 'nisbaId':
                    where.push({
                        search_author_nisba_id: {
                            [Op.like]: `%[${queryObject.query.trim()}]%`,
                        },
                    });
                    break;
                case 'aka':
                    where.push({ search_author_aka: { [Op.and]: whereOr } });
                    break;
                case 'died_date':
                    where.push({
                        search_author_date_died: { [Op.and]: whereOr },
                    });
                    break;
                case 'collection':
                    groupWhere.push({
                        [Op.or]: {
                            '$group.name$': queryObject.query,
                            '$group.aName$': queryObject.query,
                        },
                    });
                    break;
                case 'collectionNumber':
                    where.push({ collection: { [Op.and]: whereOr } });
                    break;
                case 'copyist':
                    where.push({
                        [Op.or]: {
                            copyist: { [Op.and]: whereOr },
                            aCopyist: { [Op.and]: whereOr },
                        },
                    });
                    break;
                case 'copiedAt':
                    where.push({
                        [Op.or]: {
                            copiedAt: { [Op.and]: whereOr },
                            aCopiedAt: { [Op.and]: whereOr },
                        },
                    });
                    break;
                case 'copiedDate':
                    where.push({
                        [Op.or]: {
                            copiedDate: { [Op.and]: whereOr },
                            aCopiedDate: { [Op.and]: whereOr },
                        },
                    });
                    break;
                default:
                    if (queryObject.query.trim()) {
                        let whereAnyField = [];
                        whereAnyField.push({
                            search_title: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            [Op.or]: {
                                misc: { [Op.and]: whereOr },
                                aMisc: { [Op.and]: whereOr },
                            },
                        });
                        whereAnyField.push({
                            search_subject: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            search_author: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            search_author_nisba: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            search_author_aka: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            search_author_date_died: { [Op.and]: whereOr },
                        });
                        // ?
                        /*groupWhere.push({
                            [Op.or]: {
                                '$group.name$': { [Op.and]: whereOr },
                                '$group.aName$': { [Op.and]: whereOr }
                            }
                        });*/
                        whereAnyField.push({
                            collection: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            copyist: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            aCopyist: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            copiedAt: { [Op.and]: whereOr },
                        });
                        whereAnyField.push({
                            aCopiedAt: { [Op.and]: whereOr },
                        });
                        where.push({ [Op.or]: whereAnyField });
                    }
            }
        });

        const include = [
            {
                model: Author,
                include: [Nisba],
            },
            {
                model: Group,
                where: groupWhere.length ? groupWhere : null,
            },
            {
                model: Subject,
            },
        ];

        const orderBy =
            showLastUpdated === 'true' ? [['updatedAt', 'DESC']] : [];
        search(req, res, Manuscript, where, include, orderBy);
    },
    view: (req, res) => {
        const include = [
            {
                model: Author,
                include: [Nisba],
            },
            {
                model: Group,
            },
            {
                model: Subject,
            },
        ];

        Manuscript.findOne({ where: { id: req.params.id }, include })
            .then((item) => {
                res.json(item);
            })
            .catch((err) => {
                res.json({ error: err });
            });
    },

    add: (req, res) => {
        const record = req.body;
        const me = req.user;
        if (me.admin) {
            record.approved = 1;
        }

        const authors =
            record.authors &&
            record.authors
                .map((_author) => parseInt(_author.id, 10))
                .filter(Boolean);

        if (authors) {
            record.search_author_id = authors.map((id) => `[${id}]`).join('');
        }

        record.search_title = searchValue(
            record.aTitle,
            record.aAltTitle,
            record.aAttrTitle
        );

        if (record.id) {
            const preservedFields = [
                'id',
                'createdAt',
                'updatedAt',
                'deletedAt',
            ];
            const fields = Object.keys(record).filter(
                (item) =>
                    !preservedFields.includes(item) && record[item] !== 'null'
            );

            Manuscript.update(record, { where: { id: record.id }, fields })
                .then(() => {
                    Manuscript.findOne({ where: { id: record.id } })
                        .then((updatedRecord) =>
                            updateAuthors(updatedRecord, req, res)
                        )
                        .catch((err) => res.json({ error: err }));
                })
                .catch((err) => res.json({ error: err }));
        } else {
            record.added_by = me.id;
            Manuscript.create(record)
                .then((_record) => {
                    updateAuthors(_record, req, res);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        }
    },
    delete: (req, res) => {
        const { id } = req.body;

        Manuscript.destroy({
            where: {
                id,
            },
        })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json({ error: err.message });
            });
    },
};

function updateAuthors(manuscriptModel, req, res) {
    const record = req.body;
    const authors = record.authors
        .map((_author) => parseInt(_author.id, 10))
        .filter(Boolean);
    const primaryAuthor = record.authors.find(
        (item) => item.status === 'primary'
    );
    const primaryAuthorId = primaryAuthor && parseInt(primaryAuthor.id, 10);
    if (!authors.length) {
        return manuscriptModel
            .setAuthors([])
            .then(() => res.json(manuscriptModel))
            .catch((err) => res.json({ error: err }));
    }

    Author.findAll({ where: { id: { [Op.in]: authors } } })
        .then((authorList) => {
            const secondaryAuthorList = authorList.filter(
                (_author) => _author.id !== primaryAuthorId
            );
            const primaryAuthorModel = authorList.find(
                (_author) => _author.id === primaryAuthorId
            );

            if (secondaryAuthorList.length) {
                manuscriptModel
                    .setAuthors(secondaryAuthorList)
                    .then(() => {
                        if (primaryAuthorModel) {
                            manuscriptModel
                                .addAuthor(primaryAuthorModel, {
                                    through: { status: 'primary' },
                                })
                                .then(() => res.json(manuscriptModel))
                                .catch((err) => res.json({ error: err }));
                        } else {
                            return res.json(manuscriptModel);
                        }
                    })
                    .catch((err) => res.json({ error: err }));
            } else {
                if (primaryAuthorModel) {
                    manuscriptModel
                        .setAuthors([primaryAuthorModel], {
                            through: { status: 'primary' },
                        })
                        .then(() => res.json(manuscriptModel))
                        .catch((err) => res.json({ error: err }));
                } else {
                    return res.json(manuscriptModel);
                }
            }
        })
        .catch((err) => res.json({ error: err }));
}
