const { Login, User } = require('../models/index');

const { search } = require('../utils/db-query');

module.exports = {
    index: (req, res) => {
        const include = [
            {
                model: User,
                attributes: {
                    exclude: ['password'],
                },
            },
        ];

        const orderBy = [['id', 'DESC']];

        search(req, res, Login, null, include, orderBy);
    },
};
