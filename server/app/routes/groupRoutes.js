const GroupCtrl = require('../controllers/GroupCtrl');

module.exports = function(app) {
    app.get('/api/groups', GroupCtrl.index);
};
