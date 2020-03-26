const fs = require("fs");
const mysql = require("mysql");
var db; 

// MySql Connection
function connDatabase() {
    if(!db) {
        db = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            database: process.env.MYSQL_DB, 
            ssl: {
                ca: fs.readFileSync(process.env.MYSQL_CA),
                key: fs.readFileSync(process.env.MYSQL_KEY),
                cert: fs.readFileSync(process.env.MYSQL_CERT)
            }
        });
    }

    db.connect((err) => {
        if(err) throw err; 
        console.log("MySQL Server is Connected on: ", process.env.MYSQL_HOST+":"+process.env.PORT);
    }); 

    return db;
}

module.exports = connDatabase();

// db = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PWD,
//     database: process.env.MYSQL_DB, 
//     ssl: {
//         ca: fs.readFileSync(process.env.MYSQL_CA),
//         key: fs.readFileSync(process.env.MYSQL_KEY),
//         cert: fs.readFileSync(process.env.MYSQL_CERT)
//     }
// });

// module.exports = db;