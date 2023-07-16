const Sequelize = require('sequelize');
const { CrossReference } = require('../models/index');

const { search, getQueryParts } = require('../utils/db-query');
const Op = Sequelize.Op;

module.exports = {
    index: (req, res) => {
        const queryString = req.query.query;

        const where = [];

        const orderBy = [['id', 'DESC']];

        if (queryString) {
            const queryParts = getQueryParts(queryString);
            const whereLike = queryParts.map(part => {
                return { [Op.like]: `%${part}%` };
            });
            where.push({ keyword: { [Op.and]: whereLike } });
        }

        search(req, res, CrossReference, where, null, orderBy);
    },

    view: (req, res) => {
        const queryString = req.query.query;

        if (!queryString) {
            return res.json([]);
        }

        const queryParts = getQueryParts(queryString);
        const whereLike = queryParts.map(part => {
            return { [Op.like]: `%${part}%` };
        });

        CrossReference.findAll({ where: { keyword: { [Op.or]: whereLike } } })
            .then(items => {
                const targets = {};

                const itemsJson = items.map(item => item.toJSON());

                itemsJson.forEach(item => {
                    targets[item.target] = item.id;
                });

                const uniqueItems = [];

                Object.keys(targets).forEach(key => {
                    uniqueItems.push(
                        itemsJson.find(item => item.id === targets[key])
                    );
                });

                res.json(uniqueItems);
            })
            .catch(err => {
                res.json({ error: err });
            });
    },

    add: (req, res) => {
        const { keyword, target, type } = req.body;

        CrossReference.create({
            keyword,
            target,
            type,
        })
            .then(newRecord => {
                res.json(newRecord);
            })
            .catch(err => {
                res.json(err);
            });
    },

    delete: (req, res) => {
        const { id } = req.body;

        CrossReference.destroy({
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
