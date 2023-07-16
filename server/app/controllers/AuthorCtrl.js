const Sequelize = require('sequelize');
const { Author, Group, Nisba /*, Manuscript*/ } = require('../models/index');
const { search, getQueryParts } = require('../utils/db-query');
const Op = Sequelize.Op;

module.exports = {
    index: (req, res) => {
        const {
            admin,
            query: queryString,
            fieldName,
            showLastUpdated,
        } = req.query;

        const where = [];
        // If admin, show hidden records.
        if (admin !== 'true') {
            where.push({ hidden: null });
        }
        if (queryString) {
            const queryParts = getQueryParts(queryString);
            const whereLike = queryParts.map(part => {
                return { [Op.like]: `%${part}%` };
            });
            switch (fieldName) {
                case 'name':
                    where.push({
                        [Op.or]: {
                            name: { [Op.and]: whereLike },
                            aName: { [Op.and]: whereLike },
                            altName: { [Op.and]: whereLike },
                            aAltName: { [Op.and]: whereLike },
                        },
                    });
                    break;
                case 'authorId':
                    where.push({ id: queryString });
                    break;
                case 'aka':
                    where.push({
                        [Op.or]: {
                            aka: { [Op.and]: whereLike },
                            aAka: { [Op.and]: whereLike },
                        },
                    });
                    break;
                case 'nisba':
                    where.push({
                        search_nisba: { [Op.and]: whereLike },
                    });
                    break;
                case 'nisbaId':
                    where.push({
                        search_nisba_id: {
                            [Op.like]: `%[${queryString.trim()}]%`,
                        },
                    });
                    break;
                case 'died_date':
                    where.push({
                        dateDied: { [Op.and]: whereLike },
                    });
                    break;
                default:
                    const whereAny = [];
                    whereAny.push({ name: { [Op.and]: whereLike } });
                    whereAny.push({ aName: { [Op.and]: whereLike } });
                    whereAny.push({ altName: { [Op.and]: whereLike } });
                    whereAny.push({ aAltName: { [Op.and]: whereLike } });
                    whereAny.push({ aka: { [Op.and]: whereLike } });
                    whereAny.push({ aAka: { [Op.and]: whereLike } });
                    whereAny.push({ documentation: { [Op.and]: whereLike } });
                    whereAny.push({ aDocumentation: { [Op.and]: whereLike } });
                    whereAny.push({ search_nisba: { [Op.and]: whereLike } });
                    where.push({ [Op.or]: whereAny });
            }
        }

        const orderBy =
            showLastUpdated === 'true'
                ? [['updatedAt', 'DESC']]
                : queryString ? [] : [['name', 'ASC']];

        const include = [Nisba, Group];

        search(req, res, Author, where, include, orderBy);
    },
    view: (req, res) => {
        const include = [
            Nisba,
            Group /*, { model:Manuscript, attributes: ['title', 'aTitle', 'id'] }*/,
        ];

        Author.findOne({ where: { id: req.params.id }, include })
            .then(item => {
                res.json(item);
            })
            .catch(err => {
                res.json({ error: err });
            });
    },
    add: (req, res) => {
        const record = req.body;
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

            Author.update(record, { where: { id: record.id }, fields })
                .then(() => {
                    Author.findOne({ where: { id: record.id } })
                        .then(updatedRecord =>
                            updateNisbas(updatedRecord, req, res)
                        )
                        .catch(err => res.json({ error: err }));
                })
                .catch(err => res.json({ error: err }));
        } else {
            Author.create(record)
                .then(item => {
                    updateNisbas(item, req, res);
                })
                .catch(err => {
                    res.json({ error: err });
                });
        }
    },
    delete: (req, res) => {
        const { id } = req.body;

        Author.destroy({
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

function updateNisbas(authorModel, req, res) {
    const record = req.body;
    const nisbas = record.nisbas
        .map(_nisba => parseInt(_nisba.id, 10))
        .filter(Boolean);

    if (!nisbas.length) {
        return authorModel
            .setNisbas([])
            .then(() => res.json(authorModel))
            .catch(err => res.json({ error: err }));
    }

    Nisba.findAll({ where: { id: { [Op.in]: nisbas } } })
        .then(nisbaList => {
            const orderedNisbaList = nisbas
                .map(nisbaId =>
                    nisbaList.find(nisbaObject => nisbaObject.id === nisbaId)
                )
                .filter(Boolean);
            if (orderedNisbaList.length) {
                authorModel
                    .setNisbas(orderedNisbaList)
                    .then(() => res.json(authorModel))
                    .catch(err => res.json({ error: err }));
            } else {
                return res.json(authorModel);
            }
        })
        .catch(err => res.json({ error: err }));
}
