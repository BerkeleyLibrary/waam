const User = require('../models/user');

const Token = require('../models/token');

const randomString = require('../utils/random-string');

function consumeRememberMeToken(token, fn) {
    Token.findOne({
        where: {
            token,
        },
    }).then(tokenObject => {
        if (!tokenObject) {
            return fn();
        }

        Token.destroy({ where: { token } })
            .then(() => {
                console.log(arguments);
                fn(null, tokenObject.uid);
            })
            .catch(err => {
                return fn(err);
            });
    });
}

function saveRememberMeToken(token, uid, fn) {
    Token.create({ token, uid })
        .then(() => {
            fn();
        })
        .catch(err => {
            return fn(err);
        });
}

function issueToken(user, done) {
    const token = randomString(64);

    saveRememberMeToken(token, user.id, function(err) {
        if (err) {
            return done(err);
        }
        return done(null, token);
    });
}

const userJson = user => {
    const json = Object.assign({}, user.toJSON());
    delete json.password;
    return json;
};

module.exports = {
    consumeRememberMeToken,
    saveRememberMeToken,
    issueToken,
    userJson,
};
