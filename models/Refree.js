var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Refree Model
 * ==========
 */
var Refree = new keystone.List('Refree');

Refree.add({
	name: { type: Types.Name, required: true, index: true },
	phone: { type: Types.Text, initial: true, required: true},
	gender: {type: Types.Select, options: ['male','female'], initial: true},
	email: { type: Types.Email, initial: true, required: false, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
	occupation: { type: Types.Text, initial: true, required: true},
	relationship: { type: Types.Text, initial: true},
	letter: { type: Types.Text, initial: true},
}, 'verification', {
	isVerified: { type: Boolean, index: true },
});

// Provide access to Keystone
/*Refree.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//Refree.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Refree.defaultColumns = 'name, phone, email, gender';
Refree.register();
