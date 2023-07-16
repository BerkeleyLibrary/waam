const UserCtrl = require('../controllers/UserCtrl');

const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/users', isAdmin, UserCtrl.index);
    app.get('/api/users/:id', isAdmin, UserCtrl.view);
    app.post('/api/users/update', isAdmin, UserCtrl.update);
    app.post('/api/users/delete', isAdmin, UserCtrl.delete);
};
