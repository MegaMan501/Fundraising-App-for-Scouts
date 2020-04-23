const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const db = require("../db");
const crypto = require('crypto');
const smtpTransport = require("../email");
const async = require("async");

// login a user
exports.userLogin = (req, res, next) => {
    db.query(
        'SELECT * FROM user WHERE email=?', 
        [req.body.email], 
        (err, rows, fields) => {

            // Catch and DB errors.
            if(err) { 
              console.error(err.code, err.sqlMessage);
              return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
               });
            };
            
            if (rows.length > 0) {
                if (rows) {
                    console.log("Test: ", rows[0]);
                }

                bcrypt.compare(req.body.password, rows[0].hash_pass, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: "Invalid Authentication Credentials!"
                        });
                    }
                    if(!result) {
                        return res.status(401).json({
                            message: "Invalid Authentication Credials!"
                        });
                    }
                    const token = jwt.sign(
                        {
                            email: rows[0].email, 
                            userId: rows[0].user_id, 
                            leader_flag: rows[0].leader_flag,
                            admin_flag: rows[0].admin_flag
                        }, 
                        process.env.JWT_KEY, 
                        {expiresIn: "1h"}
                    ); 
                    res.status(200).json({
                        token: token, 
                        expiresIn: 3600, 
                        userId: rows[0].user_id, 
                        leader: rows[0].leader_flag,
                        admin_flag: rows[0].admin_flag
                    }); 
                });
                
            } else {
                return res.status(401).json({
                    message: "Invalid Authentication Credials!"
                }); 
            }

            // console.error("User: " + req.body.email, "Pass: " + req.body.password); 
        });
}

//Get Reset Request system working here

//(Code for this function based on the following source:)
//https://www.codementor.io/@olatundegaruba/password-reset-using-jwt-ag2pmlck0
exports.userPassResetReq = (req, res, next) => {
    //async waterfall is used to perform functions in a sequential order
    async.waterfall([
        //First function involves finding user in database
        function(done) {
            /* Taking user's email and finding if an associated account is in the
             * database */
            db.query(
                'SELECT * FROM user WHERE email=?', 
                [req.body.email], 
                (err, rows) => {
                    if(rows) {
                        //Debugging
                        console.log(rows);
                        //If there is no rows, then return immediately
                        if(rows <= 0)
                        {
                            //Debugging
                            //console.log("No users were found!");
                            return res.status(200).json({
                                message: "If an account is associated with that email, then an email was just sent!"
                            });
                        } else {
                            done(err, rows);
                        }
                    } else {
                        done(err);
                    }
                });
        },
        //Next function involves removing any associated tokens if needed
        //CONTINUE HERE!!!!!
        //sources to refer to:
        //
        function(rows, done) {
            db.query(
                'DELETE FROM password_reset WHERE user_id=?', 
                [rows[0].user_id], 
                (err, secondaryrows) => {
                    // Catching and returning DB error.
                    if(err) {
                        done(err);
                    }
                    else {
                        done(err, rows);
                    }
            });
        },
        //This function involves generating the random token, and then hashing it
        //Also involves the generation of the expiry date
        function(rows, done)
        {
                var err;
                //Generating the random token
                //(Code based on the following:
                //https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
                const buff = crypto.randomBytes(20);
                const unhash_token = buff.toString('hex');

                //Then hashing the token before storing it in the database (uses 10 rounds of salting similar to password)
                const token = bcrypt.hashSync(unhash_token, 10);

                /*Setting an expiration time (a day from now, as indicated by the 86400000ms
                 * which can be found as a conversion from days to milliseconds: 24 hours 
                 * in a day x 60 min in an hour x 60 seconds in a minute x 1000 
                 * milliseconds in one second */
                //var expiry_date = new Date();
                var expiry_date = new Date();

                //Adding a day to the current date
                expiry_date.setDate(expiry_date.getDate() + 1);

                //Then converting the expiry_date to an ISO timestamp format
                //for the mysql database
                //Source for this: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
                var expiry_date_string = expiry_date.toISOString().slice(0, 19).replace('T', ' ');

                
                console.log("Half way point!");
                console.log("User id: " + rows[0].user_id);
                console.log("Token: " + token);
                console.log("Expiry date: " + expiry_date);

                var userId = rows[0].user_id;

                console.log("User id again: " + userId);

                //Inserting these values into the password_reset database
                db.query(
                'INSERT INTO password_reset (user_id, token, expiry_date) VALUES (?, ?, ?)', 
                [userId, token, expiry_date_string],
                (err, finalrows) => {
                    // Catching and returning DB error.
                    if(err) { 
                        console.error(err);
                        done(err);
                    }
                    
                    else
                    {
                        done(err, token, rows, expiry_date);
                    }
                });
        },

        //THe final function involves sending out the email
        function(token, rows, expiry_date, done)
        {
            console.log("we made it to the end!");
             //Setting up data for email
            //(note: for the subject line, Fundraising App could be changed to an
            //organization name)
            const email_data = {
                from: "csce4901team406dev@gmail.com",
                to: rows[0].email,
                template: 'forgot-password-template',
                subject: "Password Reset Request for Fundraising App",
                context: {
                    url: 'http://localhost:4200/reset-password?token=' + token,
                    first_name: rows[0].full_name.split(' ')[0]
                }
            }

            //Sending the email
            smtpTransport.sendMail(email_data, (err, response) => {
                if(!err) {
                    console.log(response);
                    smtpTransport.close();
                    //Send success message
                    return res.status(200).json({
                        message: "If an account is associated with that email, then an email was just sent!"
                    });
                } else {
                    return done(err);
                }
            });
        }
    ], function(err) {
        return res.status(401).json({
            message: 'Database or Email Service Error!'
        });
    });
}

//exports.userResetPass