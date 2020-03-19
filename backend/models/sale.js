const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Sale = db.define('sales', {
	sale_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	user_id: {
		type: Sequelize.INTEGER(11)
	},
	product_id: {
		type: Sequelize.INTEGER(11)
	},
	quantity: {
		type: Sequelize.INTEGER(11)
	},
	price: {
		type: Sequelize.FLOAT
	},
	sale_date: {
		type: Sequelize.DATEONLY
	}
});

module.exports = Sale;
