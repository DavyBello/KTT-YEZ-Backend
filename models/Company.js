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
	phone: { type: Types.Text, initial: true },
	email: { type: Types.Email, initial: true },
	website: { type: Types.Text, initial: true },
	address: { type: Types.Text, initial: true },
	//phone: { type: Types.Text, initial: true },
	industry: { type: Types.Relationship, ref: 'Industry', many: false, initial: true },
	//password: { type: Types.Password, initial: true, required: true },
	//passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
}, 'Jobs', {
	jobs: { type: Types.Relationship, ref: 'Job', many: true },
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
Company.defaultColumns = 'name, phone, email';
Company.register();
