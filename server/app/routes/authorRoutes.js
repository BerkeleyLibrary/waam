const authorCtrl = require('../controllers/AuthorCtrl');
const isLoggedIn = require('../shared/isLoggedIn');
const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/authors', authorCtrl.index);
    app.get('/api/authors/view/:id', authorCtrl.view);

    app.post('/api/authors/add', isLoggedIn, authorCtrl.add);
    app.post('/api/authors/delete', isAdmin, authorCtrl.delete);
};
