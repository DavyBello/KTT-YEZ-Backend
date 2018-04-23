var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Refree Model
 * ==========
 */
var Refree = new keystone.List('Refree');

const { GENDERS, PHONE_REGEX, toCamelCase  } = require('../lib/common');

Refree.add({
	name: { type: Types.Name, required: true, index: true },
	phone: { type: Types.Text, initial: true, required: true},
	gender: {type: Types.Select, options: ['male','female'], initial: true},
	gender: {type: Types.Select, options: GENDERS},
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	// password: { type: Types.Password, initial: true, required: true },
	// passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
	occupation: { type: Types.Text, initial: true},
	relationship: { type: Types.Text, initial: true},
	letter: { type: Types.Textarea, initial: true},
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
Refree.defaultColumns = 'name, phone, email, gender, relationship, isVerified';
Refree.register();
