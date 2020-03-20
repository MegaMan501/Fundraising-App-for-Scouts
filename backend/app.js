const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

/* Setting up Sequelize connection to google cloud sql server */
//Based on following two sources:
//https://www.youtube.com/watch?v=bOHysWYMZM0
//https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database

// Getting the database configruation
const db = require('./config/database');

/* Testing database connection */

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//express app startup
const app = express();

/* The homepage will display INDEX for now while testing */
app.get('/', (req, res) => res.send('INDEX'));

//User routes (testing for now. All user data will not be viewable in final 
//product unless user is admin)
app.use('/users', require('./routes/users'));
//app.use('/emailtest', require('./routes/emailtest'));

/* Listening on port 5000, or what the process environments port is set as */
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ${PORT}'));
