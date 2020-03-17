const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/user');

/* If this route is accessed, then return all users in the database, 
 * and send a HTTP status of 200 for OK. Otherwise, display 
 * error details */
router.get('/', (req,res) => 
	User.findAll()
		.then(users => { 
			console.log(users);
			res.sendStatus(200);
		})
		.catch(err => console.log(err)));

module.exports = router;
