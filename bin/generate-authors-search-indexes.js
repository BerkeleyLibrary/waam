#!/usr/bin/env node

require('../initDockerSecrets')();

const SearchIndexCtrl = require('../server/app/controllers/SearchIndexCtrl');
const startupTime = +(new Date());
console.info(`Indexing for authors started at ${new Date()}`);

const LIMIT = 500;
let page = 0;
let total = 0;

async function run() {
    try {
        while (true) {
            const offset = page * LIMIT;
            const res = await SearchIndexCtrl.authors({
                limit: LIMIT,
                offset
            });

            if (res && res.done) {
                console.info(`Indexing authors ended with success after ${Math.floor((+(new Date()) - startupTime)/1000)} seconds, a total of ${total} were updated.`);
                process.exit(0);
            }

            if (res && res.total) {
                total += res.total;
            }
            page++;

            // Yield to the event loop to prevent OOM and allow garbage collection
            await new Promise(resolve => setImmediate(resolve));
        }
    } catch (err) {
        console.error(err);
        console.error(`Indexing authors ended with an error, after ${Math.floor((+(new Date()) - startupTime)/1000)} seconds`);
        process.exit(1);
    }
}

run();
