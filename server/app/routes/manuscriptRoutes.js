const manuscriptCtrl = require('../controllers/ManuscriptCtrl');
const isLoggedIn = require('../shared/isLoggedIn');
const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/manuscripts', manuscriptCtrl.index);
    app.get('/api/manuscripts/view/:id', manuscriptCtrl.view);

    app.post('/api/manuscripts/add', isLoggedIn, manuscriptCtrl.add);
    app.post('/api/manuscripts/delete', isAdmin, manuscriptCtrl.delete);
};
