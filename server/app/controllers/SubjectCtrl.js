const Sequelize = require('sequelize');
const { NormalizedSubject, Subject } = require('../models/index');
const { search, getQueryParts } = require('../utils/db-query');
const Op = Sequelize.Op;

module.exports = {
    index: (req, res) => {
        const { query: queryString, showLastUpdated } = req.query;

        const where = [];
        if (queryString) {
            const numberValue = parseInt(queryString, 10);
            if (numberValue) {
                where.push({ id: numberValue });
            } else {
                const queryParts = getQueryParts(queryString);
                const whereLike = queryParts.map(part => {
                    return { [Op.like]: `%${part}%` };
                });

                where.push({
                    [Op.or]: {
                        subject: { [Op.and]: whereLike },
                        aSubject: { [Op.and]: whereLike },
                    },
                });
            }
        }

        const orderBy =
            showLastUpdated === 'true'
                ? [['updatedAt', 'DESC']]
                : [['subject', 'ASC']];

        search(req, res, Subject, where, null, orderBy);
    },

    normalizedSubjects: (req, res) => {
        NormalizedSubject.findAll()
            .then(results => {
                res.json(results);
            })
            .catch(error => {
                error &&
                    res.json({ error: 'Sorry, there was a database error' });
            });
    },

    view: (req, res) => {
        Subject.findOne({ where: { id: req.params.id } })
            .then(item => {
                res.json(item);
            })
            .catch(err => {
                res.json({ error: err });
            });
    },

    add: (req, res) => {
        const record = req.body;

        const me = req.user;

        /*if (me.admin) {
         record.approved = 1;
         }*/

        if (record.id) {
            const preservedFields = [
                'id',
                'createdAt',
                'updatedAt',
                'deletedAt',
            ];
            const fields = Object.keys(record).filter(
                item =>
                    !preservedFields.includes(item) && record[item] !== 'null'
            );

            Subject.update(record, { where: { id: record.id }, fields })
                .then(() => {
                    res.json(record);
                })
                .catch(err => {
                    res.json({ error: err });
                });
        } else {
            // record.added_by = me.id;
            Subject.create(record)
                .then(item => {
                    res.json(item);
                })
                .catch(err => {
                    res.json({ error: err });
                });
        }
    },
    delete: (req, res) => {
        const { id } = req.body;

        Subject.destroy({
            where: {
                id,
            },
        })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json({ error: err.message });
            });
    },
};
