const db = require("../db"); 


exports.addProduct = (req, res, next) => {
    db.query(
        'INSERT INTO product (prod_name, description, weight, cost, sales_price) VALUES (\"'+req.body.prod_name+'\",\"'+req.body.description+'\",'+req.body.weight+','+req.body.cost+','+req.body.sales_price+')',
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };
        
            //console.log("adding " + req.body.prod_name)
            return res.status(200).json({
                message: "Product Added!"
            });
        })
    return;
}

exports.deleteProduct = (req, res, next) => {
    db.query(
        //eventually this should set a retired flag
        'DELETE FROM product WHERE product_id='+req.body.product_id,
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };

            //console.log("removing "+req.body.product_id);
            return res.status(200).json({
                message: "Product deleted!"
            });
        })
    return;
}

exports.getAllProducts = (req, res, next) => {
    db.query(
        'SELECT prod_name FROM product',
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };

            var arr = new Array();
            for(let i = 0; i < rows.length; i++)
            {
                arr.push(rows[i].prod_name);
            }

            return res.status(200).json({
                rows: arr
            })
        });
    return;
}

exports.getGroupProducts = (req, res, next) => {
    db.query(
        //query will eventually include group id when its implemented
        'SELECT * FROM product',
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };

            return res.status(200).json({
                rows: rows
            })
        });
    return;
}

exports.updateProduct = (req, res, next) => {
    db.query(
        //query will eventually include group id when its implemented
        'UPDATE product SET prod_name=\"'+req.body.prod_name+'\", description=\"'+req.body.description+'\", weight='+req.body.weight+', cost='+req.body.cost+', sales_price='+req.body.sales_price+' WHERE product_id='+req.body.product_id,
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };

            return res.status(200).json({
                message: "Product Updated!"
            });
        });
    return;
}