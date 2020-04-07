const db = require("../db"); 

exports.addSale = (req, res, next) => {
    
    db.query(
        'SELECT product_id, sales_price FROM product WHERE prod_name=?', 
        [req.body.name],
        (err, rows, fields) => {
                       
            db.query(
                'INSERT INTO sale (user_id, product_id, quantity, price) values ('+req.body.uid+','+rows[0].product_id+','+req.body.quantity+','+rows[0].sales_price+')',
                (err, rows, fields) => {
                    if(err) { 
                        console.error(err);
                        return res.status(401).json({
                            message: "Database Error"
                        }); 
                    };
                    
                    console.log("sale added!")                    
                }
            );
        }
    );
}