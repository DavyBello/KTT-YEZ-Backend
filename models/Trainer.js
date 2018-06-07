var keystone = require('keystone');
var Types = keystone.Field.Types;

const { STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase  } = require('../lib/common');

/**
 * Staff Model
 * ==========
 */
var Staff = new keystone.List('Staff', {
	track: true
});
Staff.schema.set('usePushEach', true);

Staff.add({
	name: { type: Types.Name, required: true, index: true },
	phone: { type: Types.Text, initial: true, required: true, unique: true},
	username: { type: Types.Text, initial: true, required: false, unique: true, index: true, sparse: true },
	email: { type: Types.Email, initial: true, required: false, unique: true, index: true, sparse: true },
	password: { type: Types.Password, initial: true, required: true },
	passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
	// category: {type: Types.Select, options: CANDIDATE_CATEGORIES}
}, 'Details', {
	address: { type: Types.Text },
	stateOfResidence: {type: Types.Select, options: STATES},
	imageUrl: { type: Types.Text},
	// bvn: { type: Types.Text},
	// gender: {type: Types.Select, options: GENDERS},
	// dateOfBirth: { type: Types.Date },
	// placeOfBirth: { type: Types.Text},
	// nationality: { type: Types.Text},
	// stateOfOrigin: { type: Types.Text},
});

// Model Hooks
Staff.schema.pre('save', function (next) {
  this.name.first = toCamelCase(this.name.first);
  this.name.last = toCamelCase(this.name.last);
  if (PHONE_REGEX.test(this.phone)){
    next();
  } else {
		next(new Error('Invalid Phone Number'));
	}
});

/**
 * Relationships
 */
//Staff.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Staff.defaultColumns = 'name, phone, email, stateOfResidence';
Staff.register();
