const db = require("../db"); 

exports.addSale = (req, res, next) => {

    db.query(
        'SELECT product_id, sales_price FROM product WHERE prod_name=?', 
        [req.body.name],
        (err, rows, fields) => {
            if(err) { 
                console.error(err);
                return res.status(401).json({
                    message: "Database Error"
                }); 
            };
            
            db.query(
                'INSERT INTO sale (user_id, product_id, quantity, price, sale_date) values ('+req.body.uid+','+rows[0].product_id+','+req.body.quantity+','+rows[0].sales_price+',\"'+req.body.date+'\")',
                (err, rows2, fields) => {
                    if(err) { 
                        console.error(err);
                        return res.status(401).json({
                            message: "Database Error"
                        }); 
                    };

                    return res.status(200).json({
                        message: "Sale Added!"
                    })                
                }
            );
        }
    );
}

exports.getSales = (req, res) => {

    db.query(
        'SELECT product.prod_name, sale.quantity, sale.price, sale.sale_date FROM sale INNER JOIN product ON sale.product_id=product.product_id WHERE sale.user_id=?',
        [req.body.uid],
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
            
        }
    )
}