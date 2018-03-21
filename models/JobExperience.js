var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * JobExperience Model
 * ==========
 */
var JobExperience = new keystone.List('JobExperience');

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

JobExperience.add({
	companyName: { type: Types.Text, required: true, initial: true, index: true },
	role: { type: Types.Text, label: 'Role/Position', initial: true, required: true},
	address: { type: Types.Text, initial: true, required: true},
	salary: { type: Types.Text, initial: true, required: false},
	fromMonth: {type: Types.Select, options: MONTHS, initial: true},
	fromYear: { type: Types.Text, initial: true, required: false},
	isWorkingHere: { type: Boolean, initial: true, default: false },
	toMonth: {type: Types.Select, options: MONTHS, initial: true},
	toYear: { type: Types.Text, initial: true, required: false},
	duration: { type: Types.Text},
	to: {
		month: {type: Types.Select, options: MONTHS, initial: true},
		year: { type: Types.Text, initial: true, required: false},
	}
}, 'verification', {
	isVerified: { type: Boolean, initial: true, default: false },
});

// Provide access to Keystone
/*JobExperience.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/

JobExperience.schema.pre('save', function (next) {
	if (this.isWorkingHere){
		now = new Date()
		this.toMonth = MONTHS[now.getMonth()];
		this.toYear = now.getFullYear();
	}
	this.duration = !this.isWorkingHere ?
		`${this.fromMonth}, ${this.fromYear} - ${this.toMonth}, ${this.toYear} | 3 Months` :
		`${this.fromMonth}, ${this.fromYear} - Present | 3 Months`
	next();
});

/**
 * Relationships
 */
//JobExperience.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
JobExperience.defaultColumns = 'companyName, role, address';
JobExperience.register();
