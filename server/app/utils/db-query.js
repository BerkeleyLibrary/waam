const removeArabicDiacritics = str =>
    str.replace(/^(ال)/, '').replace(/[ًٌٍَُِّْ]/g, '');
const filterOutDefiniteArticleAndIbn = str =>
    str.replace(/^(ash)/g, '').length > 2 &&
    str.toLowerCase() !== 'bin' &&
    str.toLowerCase() !== 'ibn' &&
    str !== 'ابن';

module.exports = {
    search: (req, res, model, where, include = [], order, resultMap) => {
        const numPerPage = parseInt(req.query.npp, 10) || 10;

        const page = parseInt(req.query.page, 10) || 0;

        let numPages;

        const offset = page * numPerPage;

        model
            .findAndCountAll({
                where,
                limit: numPerPage,
                offset,
                include,
                order,
                distinct: !!include,
            })
            .then(results => {
                numPages = Math.ceil(results.count / numPerPage);
                const responsePayload = {
                    results: resultMap
                        ? results.rows.map(resultMap)
                        : results.rows,
                };
                if (page < numPages) {
                    responsePayload.pagination = {
                        current: page,
                        perPage: numPerPage,
                        previous: page > 0 ? page - 1 : null,
                        next: page < numPages - 1 ? page + 1 : null,
                        total: results.count,
                        numPages,
                    };
                } else {
                    responsePayload.pagination = {
                        error:
                            'queried page ' +
                            page +
                            ' is >= to maximum page number ' +
                            numPages,
                    };
                }
                res.json(responsePayload);
            })
            .catch(error => {
                error &&
                    res.json({ error: 'Sorry, there was a database error' });
            });
    },

    getQueryParts: str => {
        return str
            .replace(/[();,:?."\-\/]/g, ' ')
            .split(' ')
            .map(removeArabicDiacritics)
            .filter(filterOutDefiniteArticleAndIbn);
    },

    removeArabicDiacritics,
};
