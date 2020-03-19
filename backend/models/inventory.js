const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Inventory = db.define('inventory', {
	product_id: {
		type: Sequelize.INTEGER(11)
	},
	group_id: {
		type: Sequelize.INTEGER(11)
	},
	event_id: {
		type: Sequelize.INTEGER(11)
	},
	quantity: {
		type: Sequelize.INTEGER(11)
	}
});

module.exports = Inventory;
