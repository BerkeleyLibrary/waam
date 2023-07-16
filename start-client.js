//from here: https://github.com/fullstackreact/food-lookup-demo/blob/master/start-client.js

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);