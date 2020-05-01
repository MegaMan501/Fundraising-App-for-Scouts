const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const db = require("../db");
<<<<<<< HEAD

=======
const crypto = require('crypto');
const smtpTransport = require("../email");
const async = require("async");
>>>>>>> master

// login a user
exports.userLogin = (req, res, next) => {
<<<<<<< HEAD
  db.query(
    'SELECT * FROM user WHERE email=?',
    [req.body.email],
    (err, rows, fields) => {

      // Catch and DB errors.
      if (err) {
        console.error(err);
        return res.status(401).json({
          message: "Database Error"
        });
      };

      if (rows.length > 0) {
        if (rows) {
          console.log("Test: ", rows[0]);
        }

        bcrypt.compare(req.body.password, rows[0].hash_pass, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Invalid Authentication Credentials!"
            });
          }
          if (!result) {
            return res.status(401).json({
              message: "Invalid Authentication Credials!"
            });
          }
          const token = jwt.sign(
            { email: rows[0].email, userId: rows[0].user_id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: rows[0].user_id,
            leader: rows[0].leader_flag,
            admin_flag: rows[0].admin_flag
          });
=======
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
>>>>>>> master
        });

      } else {
        return res.status(401).json({
          message: "Invalid Authentication Credials!"
        });
      }

      // console.error("User: " + req.body.email, "Pass: " + req.body.password); 
    });
}

<<<<<<< HEAD
// get user info from user table
exports.getUser = (req, res, next) => {
  db.query("SELECT user_id, full_name, email FROM user",
    (err, rows, fields) => {
      // Catch and DB errors.
      if (err) {
        console.error(err);
        return res.status(401).json({
          message: "Get User Error"
        });
      };

      // return if sucessfully connected to database
      // fetch all data rows from table
      return res.status(200).json({
        rows: rows
      })

    }
  );
=======
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
                        //DEBUGGING
                        console.log("Removed previous requests!");
                        done(err, rows);
                    }
            });
        },
        //This function involves generating the random token, and then hashing it
        //Also involves the generation of the expiry date
        function(rows, done)
        {
                //Check if the user is verified. If they aren't then return immediately
                //REMOVE COMMENTS WHEN USER VERIFICATION SYSTEM IS READY!!!!
                /*
                if(rows[0].verified === 0)
                {
                    //Debugging
                    console.log("User is unverified!!!");
                    return res.status(200).json({
                        message: "If an account is associated with that email, then an email was just sent!"
                    });
                }
                */

                var err;
                //Generating the random token
                //(Code based on the following:
                //https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
                const buff = crypto.randomBytes(20);
                const unhash_token = buff.toString('hex');

                /* Then hashing the token before storing it in the database (uses 
                 * sha256 instead of bcrypt because the plaintext token is cryptographically
                 * secure through randomization, which means precomputation/rainbow table 
                 * attacks are highly unlikely. Hashing the token will help in deterring
                 * an attacker from gathering reset tokens to reset accounts if they ever
                 * gained access to the database in the future (either through potential
                 * future exploits, or a physical/manual attack) */
                const hash = crypto.createHash('sha256');
                hash.update(unhash_token);
                const token = hash.digest('hex');

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

                //DEBUGGING
                console.log("Half way point!");
                console.log("User id: " + rows[0].user_id);
                console.log("Unhashed token: " + unhash_token);
                console.log("Hashed Token: " + token);
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
                        //(Note: User will be sent clear text token. It will
                        //(be similar to when a user types in a clear text password
                        //(and then the hash comparison is done on the server side
                        done(err, unhash_token, rows, expiry_date);
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
	        //NOTE: DON'T FORGET TO CHANGE THE HTTP://LOCALHOST TO A 
	        //URL LIKE HTTPS WHEN DEPLOYED!  
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
>>>>>>> master
}

exports.userCheckResetToken = (req, res, next) => {
    //async waterfall is used to perform functions in a sequential order
    async.waterfall([
        /* First function involves making a hash of the passed token through
         * a POST request, and then seeing if the hash exists in the database.
         * If it doesn't then immediately return an error
         */
        function(done) {
            const unhash_token = req.body.token;
            const hash = crypto.createHash('sha256');
            hash.update(unhash_token);
            const token = hash.digest('hex');

            db.query(
                'SELECT * FROM password_reset WHERE token=?', 
                token, 
                (err, rows) => {
                    if(rows) {
                        //Debugging
                        console.log(rows);
                        //If there is no rows, then return immediately
                        if(rows <= 0)
                        {
                            //Debugging
                            //console.log("No users were found!");
                            return res.status(401).json({
                                message: "Sorry! This token is invalid or expired!"
                            });
                        } else {
                            done(err, rows);
                        }
                    } else {
                        done(err);
                    }
                }); 
        },

        //Next function involves 
        //seeing if the token is out of date or not
        //If it is, then delete the entry and return an error
        function(rows, done)
        {
            const expiry_date = rows[0].expiry_date;

            //Adding UTC to the date result for Date.parse to use
            var date_str = expiry_date + ' UTC';

            //Converting the date result to the epoch representation using parse
            var conv = Date.parse(date_str);

            var token = rows[0].token;

<<<<<<< HEAD
// insert new regular user info into user table
exports.addUser = (req, res, next) => {
  db.query("INSERT INTO user (full_name, email) VALUES ('" + req.body.name + "' ,'" + req.body.email + "')",
    (err, rows, fields) => {
      // Catch and DB errors.
      if (err) {
        console.error(err);
        return res.status(401).json({
          message: "Add User Error"
        });
      };

      // return if sucessfully connected to database
      // fetch all data rows from table
      return res.status(200).json({
        rows: rows
      })
    }
  );
}


// delete user 
exports.deleteUser = (req, res, next) => {
    db.query("DELETE FROM user WHERE user_id=?",
      [req.body.user_id],
      (err, rows, fields) => {
        // Catch and DB errors.
          if(err) {
            console.error(err);
            return res.status(401).json({
                message: "Delete User Error"
            })
          }

          // return if suceesfully deleted a user

          return res.status(200).json({
            delete_rows:rows
          })


      }
    )
  }


=======
            //Comparing the expiry date to todays date. If todays date is greater,
            //then perform deletion query and send error message to user
            //Otherwise, send a success message back to the user
            if(Date.now() > conv) {
                db.query(
                    'DELETE FROM password_reset WHERE token=?', 
                    token, 
                    (err, rows) => {
                       // Catching and returning DB error.
                        if(err) {
                            done(err);
                        }
                        else {
                            return res.status(401).json({
                                message: "Sorry! This token is invalid or expired!"
                            });
                        }
                    });
            } else {
                return res.status(200).json({
                    message: "Valid token!"
                });
            }
        }
    ], function(err) {
        return res.status(401).json({
            message: 'Database or other Service Error!'
        });
    });
}




exports.userResetPass = (req, res, next) => {
 //async waterfall is used to perform functions in a sequential order
 async.waterfall([
    /* First function involves making a hash of the passed token through
     * a POST request, and then seeing if the hash exists in the database.
     * If it doesn't then immediately return an error
     */
    function(done) {
        const unhash_token = req.body.token;
        const hash = crypto.createHash('sha256');
        hash.update(unhash_token);
        const token = hash.digest('hex');

        db.query(
            'SELECT * FROM password_reset WHERE token=?', 
            token, 
            (err, rows) => {
                if(rows) {
                    //Debugging
                    console.log(rows);
                    //If there is no rows, then return immediately
                    if(rows <= 0)
                    {
                        //Debugging
                        //console.log("No users were found!");
                        return res.status(401).json({
                            message: "Sorry! This token is invalid or expired!"
                        });
                    } else {
                        done(err, rows);
                    }
                } else {
                    done(err);
                }
            }); 
    },
    //Next function involves 
    //seeing if the token is out of date or not
    //If it is, then delete the entry and return an error
    function(rows, done)
    {
        const expiry_date = rows[0].expiry_date;

        //Adding UTC to the date result for Date.parse to use
        const date_str = expiry_date + ' UTC';

        //Converting the date result to the epoch representation using parse
        const conv = Date.parse(date_str);

        const token = rows[0].token;

        //Placeholder in case if Date.now() is skipped over
        //(which is likely the case)
        var error;

        //Comparing the expiry date to todays date. If todays date is greater,
        //then perform deletion query and send error message to user
        //Otherwise, go to final function
        if(Date.now() > conv) {
            db.query(
                'DELETE FROM password_reset WHERE token=?', 
                token, 
                (err, rows) => {
                   // Catching and returning DB error.
                    if(err) {
                        done(err);
                    }
                    else {
                        return res.status(401).json({
                            message: "Sorry! This token is invalid or expired!"
                        });
                    }
                });
        } else { 
            const password = req.body.confpassword;
            const userId = rows[0].user_id;   
            done(error, userId, password, rows);
        }
    },
    function(userId, password, rows, done)
    {
        const token = rows[0].token;
        //Do a hash of the user's password then do the database query to update it
        // Hash a password and add the leader // TODO: randomly generate the password initially
        bcrypt.hash(password, 10)
        .then(hash => {
            const pass = hash;

            //DEBUGGING
            console.log('Hash pass for db: ' + pass);
            console.log('User id: ' + userId);

            //Issue a query to update the user's password based on their user id
            db.query(
                'UPDATE user SET hash_pass = ? WHERE user_id = ?',
                [pass, userId], 
                (err, secondaryrows) => {
                    if(err) {
                        console.error(err.code, err.sqlMessage);
                        done(err);
                    }
            });
        }).catch( error => {
            console.error("HASH: ", error);
            done(error);
        });

        //Issue another query to delete the token, since the user has
        //completed the process by hitting submit
        db.query(
            'DELETE FROM password_reset WHERE token=?', 
            token, 
            (err, rows) => {
               // Catching and returning DB error.
                if(err) {
                    done(err);
                }
        });

        //Send back a success message!
        return res.status(200).json({
            message: "Your password has succesfully been reset!"
        });
    }
], function(err) {
    return res.status(401).json({
        message: 'Database or other Service Error!'
    });
});   
}
>>>>>>> master
