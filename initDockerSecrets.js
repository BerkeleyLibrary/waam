function init() {
    // Shim Docker secrets into the environment
    const secrets = require('./server/config/secrets');
    const newVars= Object.assign(process.env, secrets);
}

module.exports = init;