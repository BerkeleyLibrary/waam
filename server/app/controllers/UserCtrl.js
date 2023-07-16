const Sequelize = require('sequelize');
const { User } = require('../models/index');
const { search } = require('../utils/db-query');
const { userJson } = require('../utils/auth-util');
const Op = Sequelize.Op;

module.exports = {
    index: (req, res) => {
        const userId = req.user.id;

        const orderBy = [['id', 'DESC']];

        const where = {
            id: {
                [Op.ne]: userId,
            },
        };

        search(req, res, User, where, null, orderBy, userJson);
    },

    view: (req, res) => {
        User.findOne({ where: { id: req.params.id } })
            .then(item => {
                res.json(item);
            })
            .catch(err => {
                res.json({ error: err });
            });
    },

    update: (req, res) => {
        const user = req.body;

        const data = { admin: user.admin, active: user.active };

        User.update(data, {
            fields: ['admin', 'active'],
            where: { id: user.id },
        }).then(result => {
            res.json(result);
        });
    },

    delete: (req, res) => {
        const userId = req.body.id;

        User.destroy({
            where: {
                id: userId,
            },
        })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    },
};
