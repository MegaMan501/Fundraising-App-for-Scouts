const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Product = db.define('products', {
	product_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	prod_name: {
		type: Sequelize.STRING(64)
	},
	description: {
		type: Sequelize.STRING(255)
	},
	weight: {
		type: Sequelize.FLOAT
	},
	cost: {
		type: Sequelize.FLOAT
	},
	sales_price: {
		type: Sequelize.FLOAT
	}
});

module.exports = Product;
