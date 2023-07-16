// config/secrets.js

// Loads files from /run/secrets/* into an Object. Object keys are the names of
// the discovered files. Object values are the correponding file contents.

const fs = require('fs');

var secrets = {};

try {
    fs.readdirSync('/run/secrets').forEach(function(name) {
        console.log('Found secret "' + name + '"');
        secrets[name] = fs.readFileSync('/run/secrets/' + name, 'utf8').trim();
    });
} catch (err) {
    console.log(err);
}

module.exports = secrets;
