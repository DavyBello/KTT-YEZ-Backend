var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */
var Job = new keystone.List('Job', {
	track: true
});

Job.add({
	name: { type: Types.Name, required: true, index: true },
	phone: { type: Types.Text, initial: true },
	email: { type: Types.Email, initial: true },
	website: { type: Types.Text, initial: true },
	address: { type: Types.Text, initial: true },
	phone: { type: Types.Text, initial: true },
	industry: { type: Types.Relationship, ref: 'Industry', many: false },
	//password: { type: Types.Password, initial: true, required: true },
	//passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
}, 'Requirements', {
	address: { type: Types.Text, initial: true },
});

// Provide access to Keystone
/*Job.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//Job.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Job.defaultColumns = 'name, phone, email';
Job.register();
