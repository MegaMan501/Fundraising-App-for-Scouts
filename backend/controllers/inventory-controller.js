const db = require("../db"); 

// TODO: add a singular get for a product
exports.getProduct = (req,res,next)  => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
    return res.status(401).json({
        message: "Not Implemented!"
    });
}

exports.getProducts = (req,res,next)  => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
    
    const qry = 'CALL getInventory(?)';
    db.query( qry, [req.userData.userId], (err, rows, fields) => {
        // Catch and DB errors.
        if (err) { 
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        } 
        // console.log("UserId: "+req.userData.userId+"Inventory",rows);
        // return if sucessfully connected to database
        // fetch all data rows from table
        return res.status(200).json({
            rows: rows[0]
        });
    });
}

exports.addProduct = (req,res,next) => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }
  
    const qry = "CALL addInventory(?,?,?,?,?,?,?,?)";
    db.query(
        qry, 
        [
            parseInt(req.userData.userId),
            req.body.groupId,
            req.body.name,
            req.body.desc,
            req.body.weight,
            req.body.cost,
            req.body.quantity,
            req.body.salePrice
        ], 
        (err, results, fields) => {
            if(err) {
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            } 

            // console.log("Successfully Added Inventory.", results);
            return res.status(200).json({
                rows: results[0]
            });
    });
}

exports.updateProduct = (req,res,next)  => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }

    const qry = 'CALL updateInventory(?,?,?,?,?,?,?,?,?)';
    db.query(qry,
        [
            parseInt(req.userData.userId),
            req.body.productId,
            req.body.groupId, 
            req.body.name,
            req.body.desc,
            req.body.weight,
            req.body.cost,
            req.body.quantity,
            req.body.salePrice
        ], (err, rows, fields) => {
        if(err) {
            console.error(err.code, err.sqlMessage);
            return res.status(401).json({
                message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
            });
        }
        // console.log("Successfully updated product.", rows);
        return res.status(201).json({
            message: "Succesfully updated the product."
        });
    }); 
}

exports.deleteProduct = (req,res,next)  => {
    if (req.userData.leader_flag === 0 &&
        req.userData.admin_flag === 0) 
    {
        return res.status(401).json({
            message: "Authentication Error!"
        });
    }

    const qry = 'CALL deleteInventory(?,?)';
    db.query(qry,
      [
          parseInt(req.userData.userId),
          req.params.id
      ], (err, rows, fields) => {
      if(err) {
          console.error(err.code, err.sqlMessage);
          return res.status(401).json({
              message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
          });
      }
      // console.log("Successfully Added a Leader.", rows);
      return res.status(200).json({
          // rows: rows[0]
          message: "Successfully deleted the product."
      });
  }); 
}