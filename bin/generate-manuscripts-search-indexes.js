#! /usr/bin/env node

require('../initDockerSecrets')();

const SearchIndexCtrl = require('../server/app/controllers/SearchIndexCtrl');
const startupTime = +(new Date());
console.info(`Indexing for manuscripts started at ${new Date()}`);
const _limit = 100;
const SLEEP_TIME = 500;
let page = 0;
const _offset = page * _limit;
let total = 0;

function index(limit = _limit, offset = _offset) {
    SearchIndexCtrl.manuscripts({
        limit,
        offset,
        include: [{ all: true }]
    })
        .then(res => {
            if(res && res.done) {
                console.info(`Indexing manuscripts ended with success after ${Math.floor((+(new Date()) - startupTime)/1000)} seconds, a total of ${total} were updated.`);
                process.exit();
            } else {
                if(res.total) {
                    total += res.total;
                }
                page++;
                console.log('Now I\'m gonna sleep for half a second....');
                setTimeout(() => {
                    index(limit, page * _limit);
                }, SLEEP_TIME);

            }

        })
        .catch(err => {
            console.error(err);
            console.error(`Indexing manuscripts ended with an error, after ${Math.floor((+(new Date()) - startupTime)/1000)} seconds`);
            process.exit(1);
        });

}
index();
