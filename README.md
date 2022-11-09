![Angelo Boxing Coach](public/images/readme/abc_logo.png)

# Welcome!

This is the companion API to [Angelo Boxing Coach](https://github.com/ericjlrichard/eric-richard-abc): an Express API over a mySql database which contains details about featured boxers and their associated combos. Fun!

# Setup

## mySQL
Make sure you are running mySql ([preferably 8.0](https://dev.mysql.com/downloads/installer/)): in terminal, run "``mysqld``", then "``mysql -u <yourusername> -p``" and provide your password.

By convention, the user name is often `root`, with password `rootroot`.

While we're here, let's run "`CREATE DATABASE abc;`". We will use knex to connect to it, create the tables and populate it with data.

If mySql is not installed on your machine, you can [download it here](https://dev.mysql.com/downloads/installer/).

## knex

We'll then need knex to connect to this database.

Replace the information in eric-richard-abc-api/knexfile.js:

> module.exports = {<br>
  client: 'mysql',<br>
    connection: {<br>
    host: '127.0.0.1',<br>
    user: '`<yourusername>`',<br>
    password: '`<yourpassword>`',<br>
    database: '`<emptydatabasename>`',<br>
    charset: 'utf8',<br>
  },<br>
};

Where `emptydatabasename` should be the name empty database you created earlier ("abc" in the example).

## install node.js server dependencies

In the terminal, in folder "eric-richard-abc-api":

Run "npm install" to install dependencies, including:

- cors
- knex
- mysqlite3
- mysql
- dotenv

## populate database

In console terminal, in the eric-richard-abc-api folder, run "knex migrate:latest" to initialize database structure, you should see this:

>![Batch 1 run: 1 migrations](public/images/readme/migrate_latest.png)

Then run "knex seed:run" to populate database. You should see this (I know, 1 seed file"S" but what are you gonna do):

>![Ran 1 seed files](public/images/readme/seed_run.png)

You can verify it worked by going in mySql, and running `use abc;` (or the name you gave to the database).

Then running `SELECT first_name, last_name from boxer;`

## .env file

Create a file called .env in "eric-richard-abc-api" with the following variables:

PORT = 8080

## Enjoy!

Your ABC API should be ready to go! In terminal, in the eric-richard-abc-api directory, run "node server.js" or "nodemon server.js" to activate it.

Make sure it connects with [Angelo Boxing Coach](https://github.com/ericjlrichard/eric-richard-abc), then enjoy your workouts!