const isLoggedIn = require('../shared/isLoggedIn');

const AuthCtrl = require('../controllers/AuthCtrl');

module.exports = function(app) {
    // logged in user
    app.get('/api/me', isLoggedIn, AuthCtrl.me);

    app.get('/api/user-exists', AuthCtrl.userExists);

    // Login
    app.post('/api/login', AuthCtrl.login);

    // update
    app.post('/api/me/update', isLoggedIn, AuthCtrl.update);

    // Sign up
    app.post('/api/sign-up', AuthCtrl.signup);

    // Logout
    app.get('/api/logout', AuthCtrl.logout);
};
