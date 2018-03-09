var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Education Model
 * ==========
 */
var Education = new keystone.List('Education');

//const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Education.add({
	school: { type: Types.Text, initial: true, required: true},
	degree: { type: Types.Text, initial: true, required: true},
	field: { type: Types.Text, initial: true, required: true},
	grade: { type: Types.Text, initial: true, required: true},
	from: {
		year: { type: Types.Text, initial: true, required: false},
	},
	to: {
		year: { type: Types.Text, initial: true, required: false},
	}
}, 'verification', {
	isVerified: { type: Boolean, initial: true },
});

// Provide access to Keystone
/*Education.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//Education.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Education.defaultColumns = 'school, degree, field';
Education.register();
