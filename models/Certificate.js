var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Certificate Model
 * ==========
 */
var Certificate = new keystone.List('Certificate');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Certificate.add({
	name: { type: Types.Text, initial: true, required: true},
	authority: { type: Types.Text, initial: true, required: true},
	licenseNumber: { type: Types.Text, initial: true, required: true},
	url: { type: Types.Text, initial: true, required: true},
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
/*Certificate.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//Certificate.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Certificate.defaultColumns = 'name, authority, licenseNumber, isVerified';
Certificate.register();
