const db = require("../db"); 

exports.getSales = (req, res, next) => {

    let qry ="CALL getSale(?)";
    db.query(
        qry,
        [req.userData.userId],
        (err, results, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            return res.status(200).json({
                rows: results[0],
            });
        });
}

exports.getGroupSales = (req, res, next) => {


}


exports.addSale = (req, res, next) => {

    let qry = 'CALL addSale(?,?,?,?)'
    db.query(
        qry,
        [
            req.userData.userId,
            req.body.pid,
            req.body.quantity,
            req.body.date
        ],
        (err, results, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            return res.status(200).json({
                rows: results[0]
            });
        });
}

exports.deleteSale = (req, res, next) => {

    let qry = 'CALL deleteSale(?)'
    db.query(
        qry,
        [req.params.id],
        (err, rows, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            return res.status(200).json({
                message: "Sale deleted!"
            });
        });
}

exports.updateSale = (req, res, next) => {

    let qry = 'CALL updateSale(?,?,?,?,?,?)'
    db.query(
        qry,
        [
            req.body.saleId,
            req.userData.userId,
            req.body.productId,
            req.body.quantity,
            req.body.price,
            req.body.sale_date
        ],
        (err, rows, fields) => {

            // Catch and DB errors.
            if (err) { 
                console.error(err.code, err.sqlMessage);
                return res.status(401).json({
                    message: "Error! Code:" + err.code + " Desc: " + err.sqlMessage
                });
            }

            return res.status(200).json({
                message: "Sale Updated!"
            });
        });
}