const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); 
const mysqlconn = require("./db"); 

// setup cmd prompt
const readline = require("readline"); 
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

// setup express
const app = express();
app.use(bodyParser.json());                          // allow json 
app.use(bodyParser.urlencoded({ extended: false })); // allow url encoding

// Express Routes 
const userRoutes = require("./routes/user-route");

// settup the access controll headers and methods 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

// add a admin to the database if there is none
// INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES ('john doe', 'test@test.com', 'qwerty', 1, 1, 1);
addAdmin = (name, email, pass) => {
    bcrypt.hash(pass, 10).then( hash => {
        pass = hash; 
        mysqlconn.query(
            'INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES (?, ?, ?, 1, 1, 1)',
             [name, email, pass], (err, results, fields) => {
                if(err) throw err; 
                console.log("Successfully Added a Admin.");
                // console.log(results); 
             }); 
    }); 
}

addScout = (name, email, pass) => {
    bcrypt.hash(pass, 10).then( hash => {
        pass = hash; 
        mysqlconn.query(
            'INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES (?, ?, ?, 0, 0, 1)',
             [name, email, pass], (err, results, fields) => {
                if(err) throw err; 
                console.log("Successfully Added a Scout.");
                // console.log(results); 
             }); 
    }); 
}


// check if there is a admin in the database
hasAdmin = () => {
    mysqlconn.query('SELECT COUNT(admin_flag) as admin FROM user', (err, rows, fields) => {
        if (err) throw err; 
        // console.log('The solution is: ', rows[0].admin);
        if(rows[0].admin>0) {
            console.log("Admin User already exists"); 
        } else {
            console.log("Create Admin account"); 

            r1.question("Enter Full Name: ", (name) => {
                r1.question("Enter Email Address: ", (email) => {
                    r1.question("Enter Password: ", (pass) => {
                        addAdmin(name, email, pass);
                        r1.close();
                    });
                });
            }); 
        }
    });
}

// msg user that read has closed
// r1.on("close", () => {
//     console.log("\nClosing stdin");
// });

hasAdmin();
// addScout("test","test@test.com","qwerty");

// the API routes
app.use("/api/users", userRoutes);

module.exports = app; 