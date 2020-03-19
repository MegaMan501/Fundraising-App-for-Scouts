const Sequelize = require('sequelize');
const db = require('../config/database');

/* Defining user model based on mysql schema. Important data type information
 * can be found here:
 * https://sequelize.org/master/manual/model-basics.html#data-types
 */
const Event_Attendee = db.define('event_attendees', {
	event_id: {
		type: Sequelize.INTEGER(11)
	},
	user_id: {
		type: Sequelize.INTEGER(11)
	}
});

module.exports = Event_Attendee;
