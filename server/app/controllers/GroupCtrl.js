const { Group } = require('../models/index');

const { search } = require('../utils/db-query');

module.exports = {
    index: (req, res) => {
        const { admin } = req.query;
        const where = [];
        // If admin, show hidden records.
        if (admin !== 'true') {
            where.push({ hidden: null });
        }
        search(req, res, Group, where, null);
    },
};
