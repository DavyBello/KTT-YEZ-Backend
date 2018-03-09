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
	title: { type: String, required: true, index: true, initial: true },
	description: { type: Types.Text, initial: true },
	role: { type: Types.Email, initial: true },
	vacancy: { type: Types.Text, initial: true },
	contact: { type: Types.Text, initial: true },
	industry: { type: Types.Relationship, ref: 'Industry', many: false },
	//password: { type: Types.Password, initial: true, required: true },
	//passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
}, 'Status', {
	isVacant: {type: Boolean, default: false, index: true},
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
Job.defaultColumns = 'title, role, industry';
Job.register();
