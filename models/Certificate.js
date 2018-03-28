var keystone = require('keystone');
var Types = keystone.Field.Types;

const { MONTHS, toCamelCase } = require('../lib/common');

/**
 * Certificate Model
 * ==========
 */
var Certificate = new keystone.List('Certificate');

Certificate.add({
	name: { type: Types.Text, initial: true, required: true},
	authority: { type: Types.Text, initial: true, required: true},
	licenseNumber: { type: Types.Text, initial: true, required: true},
	url: { type: Types.Text, initial: true, required: true},
	fromMonth: {type: Types.Select, options: MONTHS, initial: true},
	fromYear: { type: Types.Text, initial: true, required: false},
	//isWorkingHere: { type: Boolean, initial: true, default: false },
	toMonth: {type: Types.Select, options: MONTHS, initial: true},
	toYear: { type: Types.Text, initial: true, required: false},
}, 'verification', {
	isVerified: { type: Boolean, initial: true, default: false },
});

// Provide access to Keystone
/*Certificate.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/

// Model Hooks
Certificate.schema.pre('save', function (next) {
  this.name = toCamelCase(this.name);
  this.authority = toCamelCase(this.authority);  
  next();
});

/**
 * Relationships
 */
//Certificate.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Certificate.defaultColumns = 'name, authority, licenseNumber, isVerified';
Certificate.register();
