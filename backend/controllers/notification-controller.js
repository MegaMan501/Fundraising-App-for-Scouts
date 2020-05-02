const db = require("../db"); 


exports.addNotification = (req,res,next)  => {

    let currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    db.query(
           'CALL addNotification(?,?,?,?,?,?)',
           [
               req.userData.userId,
               req.body.userId,
               req.body.groupId,
               req.body.message,
               currentTime,
               req.body.date
           ],
           (err, rows, fields) => {

           // Catch and DB errors.
           if (err) { 
               console.error(err.code, err.sqlMessage);
               return res.status(401).json({
                   message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
               });
           }

           //return results
           return res.status(200).json({
               rows: rows[0],
               message: "Successfully retreieved sent notifications."
           });
   });

   return;
}

exports.getNotifications = (req,res,next)  => {

    let currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query(
            'CALL getNotifications(?,?)',
            [
                req.userData.userId, 
                currentTime
            ],
            (err, rows, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            //return results
            return res.status(200).json({
                rows: rows[0],
                message: "Successfully retreieved receieved notifications."
            });
    });

    return;
}

exports.getSentNotifications = (req,res,next)  => {

     db.query(
            'CALL getSentNotifications(?)',
            [
                req.userData.userId
            ],
            (err, rows, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            //return results
            return res.status(200).json({
                rows: rows[0],
                message: "Successfully retreieved sent notifications."
            });
    });

    return;
}