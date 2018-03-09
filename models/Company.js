var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Company Model
 * ==========
 */
var Company = new keystone.List('Company', {
	track: true
});

Company.add({
	name: { type: String, required: true, index: true },
	logoUrl: { type: Types.Text, initial: true },
	phone: { type: Types.Text, initial: true },
	email: { type: Types.Email, initial: true },
	website: { type: Types.Text, initial: true },
	address: { type: Types.Text, initial: true },
	description: { type: Types.Text, initial: true },
	cacRegNo: { type: Types.Text, initial: true },
	staff: {type: Types.Select, options: ['1-10','11-30','31-100']},
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


/**
 * Registration
 */
Company.defaultSort = '-createdAt';
Company.defaultColumns = 'name, phone, email, cacRegNo';
Company.register();
