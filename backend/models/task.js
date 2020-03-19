const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Task = db.define('tasks', {
	task_id: {
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
	task_desc: {
		type: Sequelize.STRING(255)
	},
	important: {
		type: Sequelize.BOOLEAN
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

module.exports = Task;
