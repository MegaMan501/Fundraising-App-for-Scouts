const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Group = db.define('groups', {
	group_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	group_name: {
		type: Sequelize.STRING(128)
	},
	location: {
		type: Sequelize.STRING(64)
	},
	group_desc: {
		type: Sequelize.STRING(255)
	}
});

module.exports = Group;
