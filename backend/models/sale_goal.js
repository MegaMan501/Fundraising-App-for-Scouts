const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Sale_Goal = db.define('sales_goals', {
	goal_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	user_id: {
		type: Sequelize.INTEGER(11)
	},
	group_id: {
		type: Sequelize.INTEGER(11)
	},
	sales_goal: {
		type: Sequelize.FLOAT
	},
	due_date: {
		type: Sequelize.DATEONLY
	},
	due_time: {
		type: Sequelize.TIME
	},
	fin_goal: {
		type: Sequelize.FLOAT
	},
	notif_int: {
		type: Sequelize.INTEGER(11)
	}
});

module.exports = Sale_Goal;
