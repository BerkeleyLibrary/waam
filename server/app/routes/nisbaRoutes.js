const NisbaCtrl = require('../controllers/NisbaCtrl');
const isLoggedIn = require('../shared/isLoggedIn');
const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/nisbas', NisbaCtrl.index);
    app.get('/api/nisbas/view/:id', NisbaCtrl.view);

    app.post('/api/nisbas/add', isLoggedIn, NisbaCtrl.add);
    app.post('/api/nisbas/delete', isAdmin, NisbaCtrl.delete);
};
