var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * JobExperience Model
 * ==========
 */
var JobExperience = new keystone.List('JobExperience');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

JobExperience.add({
	companyName: { type: Types.Text, required: true, initial: true, index: true },
	role: { type: Types.Text, label: 'Role/Position', initial: true, required: true},
	address: { type: Types.Text, initial: true, required: true},
	salary: { type: Types.Text, initial: true, required: false},
	from: {
		month: {type: Types.Select, options: months, initial: true},
		year: { type: Types.Text, initial: true, required: false},
	},
	to: {
		month: {type: Types.Select, options: months, initial: true},
		year: { type: Types.Text, initial: true, required: false},
	}
}, 'verification', {
	isVerified: { type: Boolean, initial: true, default: false },
});

// Provide access to Keystone
/*JobExperience.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//JobExperience.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
JobExperience.defaultColumns = 'companyName, role, address';
JobExperience.register();
