const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const db = require("../db"); 

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

// should be removed!
exports.getUser = (req, res, next) => {

    db.query("SELECT user_id,group_id,full_name,email FROM user Where leader_flag = 1",
    (err, rows, fields) => {
         // Catch and DB errors.
         if(err) { 
          console.error(err.code, err.sqlMessage);
          return res.status(401).json({
            message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
           });
        };

        // console.log(rows);
       
        // return if sucessfully connected to database
        // fetch all data rows from table
        return res.status(200).json({
            rows: rows
        })
        
        }
       

    );
}

// get all leaders
exports.getLeaders = (req, res, next) => {
    if (!req.userData.admin_flag) {
      return res.status(401).json({
          message: "Authentication Error!"
      });
    }

    db.query("SELECT user_id,group_id,full_name,email FROM user Where leader_flag = 1 and admin_flag = 0",
      (err, rows, fields) => {
         // Catch and DB errors.
         if(err) {
           console.error(err.code, err.sqlMessage);
           return res.status(401).json({
             message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        };

          // console.log(rows);
        
          // return if sucessfully connected to database
          // fetch all data rows from table
          return res.status(200).json({
              rows: rows
          })
        
        }
    );
}

// get all scouts connected 
exports.getScouts = (req, res, next) => {
  if( !req.userData.leader_flag && !req.userData.admin_flag) {
    return res.status(401).json({
        message: "Authentication Error!"
    });
}
    db.query("SELECT user_id,group_id,full_name,email FROM user Where leader_flag = 0 AND admin_flag = 0",
    (err, rows, fields) => {
         // Catch and DB errors.
         if(err) { 
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
              message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        };

        // console.log("Scouts",rows);
       
        // return if sucessfully connected to database
        // fetch all data rows from table
        return res.status(200).json({
            rows: rows
        })
        
        }
       

    );
}

// get all scouts connected 
exports.getGroups = (req, res, next) => {
  if( !req.userData.leader_flag && !req.userData.admin_flag) {
    return res.status(401).json({
        message: "Authentication Error!"
    });
  }

  db.query("SELECT * FROM groups",
  (err, rows, fields) => {
       // Catch and DB errors.
       if(err) { 
        console.error(err.code, err.sqlMessage);
        return res.status(401).json({
          message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
         });
      };

      // console.log("Groups",rows);
     
      // return if sucessfully connected to database
      // fetch all data rows from table
      return res.status(200).json({
          rows: rows
      })
      
      }
     

  );
}

// insert new leader
exports.addLeader = (req, res, next) => {
    // console.log(req.userData, req);
    if (!req.userData.admin_flag) {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }

    const qry = 'INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES (?, ?, ?, 1, 0, 0)';
    const email = req.body.email.toLowerCase();
    const name = req.body.fullname;
    bcrypt.hash(req.body.pass, 10).then( hash => {
        pass = hash; 
        db.query(qry, [name, email, pass], (err, results, fields) => {
            if(err) {
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            } else {
                console.log("Successfully Added a Leader.");
                return res.status(201).json({
                  message: "Successfully added Leader: " + name 
                });
            }
        }); 
    }).catch( error => {
            console.error("HASH: ", error);
    }); 
}

// insert a new scout
exports.addScout = (req, res, next) => {
    if( !req.userData.leader_flag && !req.userData.admin_flag) {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
    
    const qry = 'INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) VALUES (?, ?, ?, 0, 0, 0)';
    const email = req.body.email.toLowerCase();
    const name = req.body.fullname;
    bcrypt.hash(req.body.pass, 10).then( hash => {
        pass = hash; 
        db.query( qry, [name, email, pass], (err, results, fields) => {
            if(err) {
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            } else {
                console.log("Successfully Added a Scout.");
                return res.status(201).json({
                  message: "Successfully added Scout: " + name 
                });
            }
        }); 
    }).catch( error => {
            console.error("HASH: ", error);
    }); 
}

// insert a new group
exports.addGroup = (req, res, next) => {
    if( !req.userData.leader_flag && !req.userData.admin_flag) {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
    // console.log(req.body);
    const qry = 'INSERT INTO groups (`group_id`, `group_name`, `location`, `group_desc`) VALUES (?,?,?,?)';   
    db.query( qry, 
        [req.body.groupId, req.body.group_name, req.body.location, req.body.group_desc],
        (err, results, fields) => {
        if(err) {
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } else {
            console.log("Successfully Added a Group.");
            return res.status(201).json({
              message: "Successfully added Group: " + req.body.group_name 
            });
        }
    }); 

}