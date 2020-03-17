const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const User = db.define('user', {
	user_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	group_id: {
		type: Sequelize.INTEGER(11)
	},
	full_name: {
		type: Sequelize.STRING(100)
	},
	email: {
		type: Sequelize.STRING(255)
	},
	hash_pass: {
		type: Sequelize.STRING(255)
	},
	leader_flag: {
		type: Sequelize.BOOLEAN
	},
	admin_flag: {
		type: Sequelize.BOOLEAN
	},
	verified: {
		type: Sequelize.BOOLEAN
	}
});

module.exports = User;
