const SubjectCtrl = require('../controllers/SubjectCtrl');
const isLoggedIn = require('../shared/isLoggedIn');
const isAdmin = require('../shared/isAdmin');

module.exports = function(app) {
    app.get('/api/subjects', SubjectCtrl.index);
    app.get('/api/subjects/view/:id', SubjectCtrl.view);
    app.get('/api/normalizedSubjects', SubjectCtrl.normalizedSubjects);

    app.post('/api/subjects/add', isLoggedIn, SubjectCtrl.add);
    app.post('/api/subjects/delete', isAdmin, SubjectCtrl.delete);
};
