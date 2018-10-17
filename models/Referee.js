const keystone = require('keystone');

const { Types } = keystone.Field;

/**
 * Referee Model
 * ==========
 */
const Referee = new keystone.List('Referee');

const { GENDERS, PHONE_REGEX, toCamelCase } = require('../lib/common');

Referee.add({
  name: { type: Types.Text, required: true, index: true },
  candidateId: {
    type: Types.Relationship, ref: 'Candidate', index: true, noedit: true, initial: true, required: true,
  },
  phone: { type: Types.Text, initial: true, required: true },
  gender: { type: Types.Select, options: GENDERS, initial: true },
  email: {
    type: Types.Email, initial: true, required: true, unique: true, index: true,
  },
  // password: { type: Types.Password, initial: true, required: true },
  // passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
  occupation: { type: Types.Text, initial: true },
  workAddress: { type: Types.Text, initial: true },
  relationship: { type: Types.Text, initial: true },
  letter: { type: Types.Textarea, initial: true },
}, 'verification', {
  isVerified: { type: Boolean, index: true },
});

// Model Hooks
Referee.schema.pre('save', function (next) {
  this.name = toCamelCase(this.name);
  if (PHONE_REGEX.test(this.phone)) {
    next();
  } else {
    next(new Error('Invalid Phone Number'));
  }
});

/**
 * Registration
 */
Referee.defaultColumns = 'name, candidateId, phone, email, gender, relationship, isVerified';
Referee.register();
