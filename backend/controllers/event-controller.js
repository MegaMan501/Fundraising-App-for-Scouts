const db = require("../db");

// get all events
exports.getEvents = (req, res, next) => {
    const qry = 'CALL getEvents()';
    db.query( qry, (err, rows, fields) => {
        // Catch and DB errors.
        if (err) { 
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } 
        // console.log("UserId: "+req.userData.userId+"Groups",rows);
        // return if sucessfully connected to database
        // fetch all data rows from table
        return res.status(200).json({
            rows: rows[0]
        });
    });
}

// insert a new event
exports.addEvent = (req, res, next) => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }

    // console.log(req.body);
    // return res.status(401).json({
    //     message: "Authentication Error!"
    // });
    const qry = 'CALL addEvent(?,?,?,?,?,?)';   
    db.query(qry, 
        [
            parseInt(req.userData.userId), 
            req.body.evnTitle, 
            req.body.evnStartDate,
            req.body.evnEndDate,
            req.body.evnLoc,
            req.body.evnDesc
        ],
        (err, results, fields) => {
        if(err) {
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } 

        // console.log("Successfully Added a Group.", results);
        return res.status(200).json({
            rows: results[0],
            message: `Successfully Added Group ${req.body.group_name}`
        });
    }); 
}

// delete
exports.deleteEvent = (req, res, next) => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
    // console.log(req.params);
    db.query('CALL deleteEvent(?,?)', 
    [
        parseInt(req.userData.userId),
        req.params.id
    ],
    (err, results, fields) => {
        if(err) {
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } 

        // console.log("Successfully Added a Group.", results);
        return res.status(201).json({
            // rows: results[0]
            message: 'Successfully deleted Event'
        });
    });  
}

// update the group
exports.updateEvent = (req, res, next) => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }

    console.log(req.body, req.params.id);
    return res.status(201).json({
        message: "Not Implemented"
    });

    db.query('CALL updateGroups(?,?,?,?,?,?)', 
    [
        parseInt(req.userData.userId),
        req.params.id,      // prev groupId
        req.body.groupId,   // possibliy new groupId
        req.body.groupName,
        req.body.groupLocation,
        req.body.groupDesc
    ],
    (err, results, fields) => {
        if(err) {
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } 

        // console.log("Successfully Updated a Group.", results);
        return res.status(201).json({
            // rows: results[0]
            message: `Success Updated Group: ${req.body.groupName}`
        });
    }); 
   
}
