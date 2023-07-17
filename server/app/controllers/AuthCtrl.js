const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const { User } = require('../models/index');
const { issueToken, userJson } = require('../utils/auth-util');

module.exports = {
    index: (req, res) => {},

    me: (req, res) => {
        res.json(userJson(req.user));
    },

    userExists: (req, res) => {
        User.findOne({
            where: {
                email: req.query.email,
            },
        }).then(user => {
            if (user) {
                return res.json({
                    status: true,
                });
            }

            return res.json({
                status: false,
            });
        });
    },

    login: (req, res) => {
        passport.authenticate('local-login', function(err, user, params) {
            if (err) {
                return res.json({ error: err.message });
            }

            if (!user && params) {
                return res.json({ error: params.message });
            }
            if (!user) {
                return res.json({ error: 'Invalid Login' });
            }
            req.login(user, {}, function(err) {
                if (err) {
                    return res.json({ error: err });
                }

                if (req.body.remember) {
                    issueToken(user, function(err, token) {
                        if (err) {
                            console.log('error in auth contoller...', err);
                            return res.json({ error: err });
                        }

                        res.cookie('remember_me', token, {
                            path: '/',
                            httpOnly: true,
                            maxAge: 604800000,
                        });

                        return res.json(userJson(req.user));
                    });
                } else {
                    return res.json(userJson(req.user));
                }

                /*if (req.body.remember) {
                 req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 100;
                 } else {
                 req.session.cookie.expires = false;
                 }*/
            });
        })(req, res);
    },

    signup: (req, res) => {
        passport.authenticate('local-signup', function(err, user, params) {
            if (err) {
                return res.json({ error: err.message });
            }

            if (!user && params) {
                return res.json({ error: params.message });
            }

            req.login(user, {}, function(err) {
                if (err) {
                    return res.json({ error: err });
                }

                return res.json(userJson(user));
            });
        })(req, res);
    },

    logout: (req, res, next) => {
        res.clearCookie('remember_me');
        req.logout(function(err) {
            if (err) {
                return next(err);
            }
            res.json({
                msg: 'User logged out.',
            });
        });
    },

    update: (req, res) => {
        const user = req.body;

        const me = req.user;

        const data = {
            name: user.name,
            password: user.password
                ? bcrypt.hashSync(user.password, null, null)
                : null,
        };

        const fields = ['name'];

        if (data.password) {
            fields.push('password');
        }

        User.update(data, { fields, where: { id: me.id } }).then(result => {
            res.json(result);
        });
    },
};
