const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Event = db.define('events', {
	event_id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false
	},
	start_date: {
		type: Sequelize.DATEONLY
	},
	end_date: {
		type: Sequelize.DATEONLY
	},
	start_time: {
		type: Sequelize.TIME
	},
	end_time: {
		type: Sequelize.TIME
	},
	location: {
		type: Sequelize.STRING(64)
	},
	event_desc: {
		type: Sequelize.STRING(255)
	},
	notif_int: {
		type: Sequelize.INT(11)
	}
});

module.exports = Event;
