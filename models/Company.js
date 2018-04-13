var keystone = require('keystone');
var Types = keystone.Field.Types;


const { STATES, PHONE_REGEX, toCamelCase  } = require('../lib/common');

/**
 * Company Model
 * ==========
 */
var Company = new keystone.List('Company', {
	track: true
});
Company.schema.set('usePushEach', true);


staffOptions = [
	{ value: "a", label: '1 - 10' },
	{ value: "b", label: '11 - 30' },
	{ value: "c", label: '31 - 100' },
]

Company.add({
	name: { type: String, required: true, index: true },
	logoUrl: { type: Types.Text, initial: true },
	phone: { type: Types.Text, initial: true, index: true, required: true },
	email: { type: Types.Email, initial: true, index: true, required: true },
	website: { type: Types.Text, initial: true },
	address: { type: Types.Text, initial: true },
	stateOfResidence: {type: Types.Select, options: STATES, index: true},
	description: { type: Types.Text, initial: true },
	cacRegNo: { type: Types.Text, initial: true, index: true },
	staffSize: {type: Types.Select, options: staffOptions},
	industry: { type: Types.Relationship, ref: 'Industry', many: false, initial: true },
	password: { type: Types.Password, initial: true, required: true },
	passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
}, 'Jobs', {
	jobs: { type: Types.Relationship, ref: 'Job', many: true },
}, 'Status', {
	isActive: {type: Boolean, default: false, index: true},
	isVerified: {type: Boolean, default: false, index: true},
});

// Provide access to Keystone
/*Company.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//Company.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

Company.schema.pre('save', function (next) {
  this.name = toCamelCase(this.name);
  if (PHONE_REGEX.test(this.phone)){
    next();
  } else {
		next(new Error('Invalid Phone Number'));
	}
});

/**
 * Registration
 */
Company.defaultSort = '-createdAt';
Company.defaultColumns = 'name, phone, email, cacRegNo';
Company.register();
