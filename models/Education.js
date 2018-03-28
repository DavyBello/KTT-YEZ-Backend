var keystone = require('keystone');
var Types = keystone.Field.Types;

const { MONTHS, toCamelCase } = require('../lib/common');

/**
 * Education Model
 * ==========
 */
var Education = new keystone.List('Education');

Education.add({
	school: { type: Types.Text, initial: true, required: true},
	degree: { type: Types.Text, initial: true, required: true},
	field: { type: Types.Text, initial: true, required: true},
	grade: { type: Types.Text, initial: true, required: true},
	fromMonth: {type: Types.Select, options: MONTHS, initial: true},
	fromYear: { type: Types.Text, initial: true, required: false},
	//isWorkingHere: { type: Boolean, initial: true, default: false },
	toMonth: {type: Types.Select, options: MONTHS, initial: true},
	toYear: { type: Types.Text, initial: true, required: false},
}, 'verification', {
	isVerified: { type: Boolean, initial: true },
});

// Provide access to Keystone
/*Education.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/

// Model Hooks
Education.schema.pre('save', function (next) {
  this.school = toCamelCase(this.school);
  this.degree = toCamelCase(this.degree);
  this.field = toCamelCase(this.field);
  next();
});

/**
 * Relationships
 */
//Education.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Education.defaultColumns = 'school, degree, field';
Education.register();
