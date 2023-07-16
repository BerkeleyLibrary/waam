// config/passport.js

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

const RememberMeStrategy = require('passport-remember-me').Strategy;

// load up the user model
const bcrypt = require('bcrypt-nodejs');

const User = require('../app/models/user');

const Login = require('../app/models/login');

const authUtils = require('../app/utils/auth-util');

const consumeRememberMeToken = authUtils.consumeRememberMeToken;

const issueToken = authUtils.issueToken;

// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    });

    passport.use(
        new RememberMeStrategy(function(token, done) {
            consumeRememberMeToken(token, function(err, uid) {
                if (err) {
                    return done(err);
                }
                if (!uid) {
                    return done(null, false);
                }

                User.findById(uid)
                    .then(user => {
                        if (!user) {
                            return done(null, false);
                        }
                        console.info('logging using remember me');
                        Login.create({ userId: user.id, loginType: 1 })
                            .then(entry => {
                                return done(null, user);
                            })
                            .catch(() => {
                                return done(null, user);
                            });
                    })
                    .catch(done);
            });
        }, issueToken)
    );

    // LOCAL LOGIN

    passport.use(
        'local-login',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                // callback with email and password from our form

                User.findOne({
                    where: {
                        email,
                    },
                })
                    .then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: 'No user found.',
                            });
                        }
                        if (
                            !bcrypt.compareSync(password, user.password) ||
                            !user.active
                        ) {
                            return done(null, false, {
                                message: 'Wrong credentials.',
                            }); // create the loginMessage and save it to session as flashdata
                        }

                        // all is well, return successful user

                        console.info('logging using form');

                        // note that express lowercases headers

                        const ipAddr =
                            req.headers['x-forwarded-for'] ||
                            req.connection.remoteAddress;

                        Login.create({ userId: user.id, ip: ipAddr })
                            .then(() => {
                                return done(null, user);
                            })
                            .catch(() => {
                                return done(null, user);
                            });
                    })
                    .catch(err => {
                        return done(err);
                    });
            }
        )
    );

    // LOCAL SIGNUP

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists

                User.findOne({
                    where: {
                        email,
                    },
                })
                    .then(user => {
                        if (user) {
                            done(null, false, {
                                message: 'That username is already taken.',
                            });
                        } else {
                            User.create({
                                email,
                                password: bcrypt.hashSync(password, null, null),
                                admin: false,
                                active: false,
                                name: req.body.fullName,
                            })
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    done(err);
                                });
                        }
                    })
                    .catch(err => {
                        done(err);
                    });
            }
        )
    );
};
