## Prerequisites

- Install NodeJS 16 or greater [https://nodejs.org/en/download/]
- MySQL 5.7
- yarn [https://yarnpkg.com/], for dependency management and build and run scripts.
- [Optional] pm2 [https://github.com/Unitech/pm2] Production Process Manager for Node.js apps or similar package.
- [Optional] nginx [https://nginx.org/en/] for reverse proxy in production

## Database setup
A dump of test data in the database can be found in `data` directory
First we need to set our database connection string an an env variable `DATABASE_URL`.


## Installing dependencies

There are two parts, server and client, both has dependencies that will need to be installed.
in the root:
```
// in the application root
yarn install // to install deps for server side.
cd client // cd to the client directory
yarn install // to install deps for client side.
```

## Running in Docker

The default docker-compose configuration sets up three services:

- "node": The web application, bound to port 3002.
- "db": The MySQL (well, MariaDB) database, bound to port 3306.
- "adminer": A PHPMyAdmin-like database interface bound to port 8080.

Only the "node" image is actually built, and is based on the Dockerfile in this directory. To build it:

```sh
docker-compose build --pull
```

To start the entire stack:

```sh
docker-compose up -d
```

The node container uses `npm` as its entrypoint, so you can run commands like the indexer like so:

```sh
docker-compose run --rm node run search-index
```

Note: Running the indexer commands is not needed on the live site, since the data there is readonly.

MySQL database test data is stored in a Docker volume. By default, the database container will load the `data/test-data.sql` file to initialize the amms2 database.

To stop the containers and start from scratch (removing volumes), run:

```sh
docker-compose down -v
```

## Starting development server

```
// in the application root
npm run start
```
This should open the app in your default browser at http://localhost:3000

## Creating a production build

The client side needs to be built using webpack and babel, as it uses ES6 and jsx.

At build time, Google analytics ID and Google Maps API key are expected to be provided via the following environment variable `REACT_APP_GOOGLE_ANALYTICS_ACCOUNT_ID` and `REACT_APP_GOOGLE_MAPS_API_KEY`.
```
cd client
npm run build
// to run the app
cd .. // to go back to root
node server.js
```
Now you should be able to access the app on http://localhost:3002
Port can be changed by setting API_PORT environment variable.

## Running search index scripts
Search indexing scripts will need to run after content is updated, i.e. a record was added or updated.
Only two tables need indexing, `manuscripts` and `authors`.

T run indexing for both:

```
npm run search-index
```

To run indexing for `authors` only:

```
npm run search:authors
```

To run indexing for `manuscripts` only:

```
npm run search:manuscripts
```
TODO: these scripts should be run by a crop job that runs nightly.

## Links

* [How To Set Up a Node.js Application for Production on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)
* [How To Set Up Nginx Server Blocks (Virtual Hosts) on Ubuntu 14.04 LTS](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts)
* [Using Let�s Encrypt with Express](https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625#.9d8g7vboy)

## Other
Enabling a site in nginx
```
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```
Manage MySQl service
```
sudo service mysql [status|start|stop]
```