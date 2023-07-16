const loginsCtrl = require('../controllers/LoginsCtrl');

const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/logins', isAdmin, loginsCtrl.index);
};
