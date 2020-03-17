// Configuration for the database is based on the following two sources:
//https://www.youtube.com/watch?v=bOHysWYMZM0
//https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database

const Sequelize = require('sequelize');

/* Dependency for node file system */
const fs = require('fs');


/* NOTE: If ssl is required for a database, then use these to import the 
 * necessary ssl files */
// Source: https://stackoverflow.com/questions/43948920/how-to-connect-via-ssl-to-sequelize-db
// NOTE: REQUIRES EXACT FILE SYSTEM PATH in place of filepath
// EXAMPLE: UNIX/LINUX - "/home/user/cert_files/client-key.pem"
// EXAMPLE: Windows - "C:\Users\user\Documents\cert_files\client-key.pem"
const cKey = fs.readFileSync("filepath", 'utf8');
const cCert = fs.readFileSync("filepath", 'utf8');
const cCA = fs.readFileSync("filepath", 'utf8');

/* NOTE: The user name and password have been sanitized for push to github. 
 * To perform testing, change user and password to the username and password 
 * used on your mysql/mariadb server */
module.exports = new Sequelize('application', 'user', 'pass', {
	/* NOTE: host has been sanitizied for push to github. To perform testing, 
	 * change host to the IP address or hostname which your sql server is 
	 * hosted on. */
	host: 'host',
	dialect: 'mysql',
	/* NOTE: If ssl is required for a database, then use these options, 
	 * and provide necessary ssl files above. */
	dialectOptions: {
		ssl: {
			key: cKey,
			cert: cCert,
			ca: cCA
		}
	},
	// Timestamps (as used by Sequelize) were not defined in our schema
	define: {
		timestamps:false
	}
});
