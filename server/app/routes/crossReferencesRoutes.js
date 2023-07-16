const isAdmin = require('../shared/isAdmin');

const CrossReferencesCtrl = require('../controllers/CrossReferencesCtrl');

module.exports = function(app) {
    // get

    app.get('/api/cross-references', CrossReferencesCtrl.index);

    // get one cross-reference

    app.get('/api/cross-references/view', CrossReferencesCtrl.view);

    // add new cross reference

    app.post('/api/cross-references/add', isAdmin, CrossReferencesCtrl.add);

    // delete

    app.post(
        '/api/cross-references/delete',
        isAdmin,
        CrossReferencesCtrl.delete
    );
};
