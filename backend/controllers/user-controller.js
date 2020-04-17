const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const db = require("../db"); 


exports.userLogin = (req, res, next) => {
    db.query(
        'SELECT * FROM user WHERE email=?', 
        [req.body.email], 
        (err, rows, fields) => {

            // Catch and DB errors.
            if(err) { 
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
                        {email: rows[0].email, userId: rows[0].user_id}, 
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

// get user info from user table
exports.getUser = (req, res, next) => {
    db.query("SELECT group_id,full_name, email FROM user",
    (err, rows, fields) => {
         // Catch and DB errors.
         if(err) { 
            console.error(err);
            return res.status(401).json({
                message: "Database Error"
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


// insert new regular user info into user table
exports.addUser = (req, res, next) => {
  db.query("INSERT INTO user (full_name, email) VALUES ('"+req.body.name+"' ,'"+req.body.email+"')",
  (err, rows, fields) => {
       // Catch and DB errors.
       if(err) { 
          console.error(err);
          return res.status(401).json({
              message: "Database Error"
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


