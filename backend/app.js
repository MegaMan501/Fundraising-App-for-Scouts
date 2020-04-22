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
const saleRoutes = require("./routes/sale-route");
const inventoryRoutes = require("./routes/inventory-route");
const memberRoutes = require("./routes/member-route");

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
addAdmin = (name, email, pass) => {
    const qry = 'INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES (?, ?, ?, 0, 1, 1)';
    email = email.toLowerCase();
    // hash the password and then send it to the database
    bcrypt.hash(pass, 10)
    .then(hash => {
        pass = hash; 
        mysqlconn.query(qry, [name, email, pass], (err, results, fields) => {
            if(err) throw err; 
            console.log("Successfully Added a Admin.");
        }); 
    }).catch( error => {
        if(error) throw error;
    }); 
}

// query data
hasAdmin = () => {
    mysqlconn.query('SELECT COUNT(admin_flag) as admin FROM user where admin_flag=true', (err, rows, fields) => {
        if (err) throw err; 
            if (rows[0].admin == 0) {
                console.log("Create an initial admin account!"); 
                r1.question("Enter Full Name: ", (name) => {
                    r1.question("Enter Email Address: ", (email) => {
                        r1.question("Enter Password: ", (pass) => {
                            addAdmin(name, email, pass);
                            r1.close();
                        });
                    });
                }); 
            }
        // console.log("Admin User already exists"); 
        // console.log('The solution is: ', rows[0].admin);
        // console.log(rows);
    });
}

// Check if admin account exists
hasAdmin();

// the API routes
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/member", memberRoutes);

module.exports = app; 