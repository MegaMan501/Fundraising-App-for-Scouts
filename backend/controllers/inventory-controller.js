const db = require("../db"); 

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
}
