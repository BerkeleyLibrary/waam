const authRoutes = require('./authRoutes');

const manuscriptsRoutes = require('./manuscriptRoutes');

const authorRoutes = require('./authorRoutes');

const subjectRoutes = require('./subjectRoutes');

const loginsRoutes = require('./loginsRoutes');

const userRoutes = require('./userRoutes');

const nisbaRoutes = require('./nisbaRoutes');

const groupRoutes = require('./groupRoutes');

const crossreferencesRoutes = require('./crossReferencesRoutes');

module.exports = function(app, passport) {
    authRoutes(app, passport);
    manuscriptsRoutes(app);
    authorRoutes(app);
    subjectRoutes(app);
    loginsRoutes(app);
    userRoutes(app);
    nisbaRoutes(app);
    groupRoutes(app);
    crossreferencesRoutes(app);
    app.get('/health-check', (req, res) => res.sendStatus(200));
};
