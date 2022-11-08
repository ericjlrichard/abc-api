# Setup


## mySQL
Make sure you are running mySQL: in terminal, run "mysqld", then "mysql -u <yourusername> -p" and provide your password.

Replace the information in knexfile.js:

 module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: '<yourusername>',
    password: '<yourpassword>',
    database: '<emptydatabasename>',
    charset: 'utf8',
  },
};

The database should be an empty database you created. You can run "CREATE DATABASE abc;" in mySQL, for example.

## install node.js server dependencies

In the terminal, in folder "eric-richard-abc-api":

Run "npm install" to install dependencies

## populate database

Run "knex migrate:latest" to initialize database structure

Run "knex seed:run" to populate database

## .env file

Create a file called .env in "eric-richard-abc-api" with the following variables:

PORT = 8080

Your ABC API should be ready to go! Run "node server.js" or "nodemon server.js" to activate it.