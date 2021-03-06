/* eslint-disable func-names */
const keystone = require('keystone');

const { Types } = keystone.Field;
const moment = require('moment');

const { STATES, MONTHS, toCamelCase } = require('../lib/common');

/**
 * JobExperience Model
 * ==========
 */
const JobExperience = new keystone.List('JobExperience', {
  map: { name: 'companyName' },
});

JobExperience.add({
  companyName: {
    type: Types.Text, required: true, initial: true, index: true,
  },
  candidateId: {
    type: Types.Relationship, ref: 'Candidate', index: true, noedit: true, initial: true, required: true,
  },
  role: {
    type: Types.Text, label: 'Role/Position', initial: true, required: true,
  },
  address: { type: Types.Text, initial: true, required: true },
  state: {
    type: Types.Select, options: STATES, required: true, initial: true,
  },
  salary: { type: Types.Number, initial: true, required: false },
  fromMonth: {
    type: Types.Select, options: MONTHS, initial: true, required: true,
  },
  fromYear: { type: Types.Text, initial: true, required: true },
  isWorkingHere: { type: Boolean, initial: true, default: true },
  toMonth: { type: Types.Select, options: MONTHS, initial: true },
  toYear: { type: Types.Text, initial: true },
  duration: { type: Types.Text },
  startDate: { type: Types.Date, index: true },
  endDate: { type: Types.Date, index: true },
}, 'verification', {
  isVerified: { type: Boolean, initial: true, default: false },
});

// Provide access to Keystone
/* JobExperience.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
}); */

// Model Hooks
JobExperience.schema.pre('save', function (next) {
  if (this.role.length > 5) {
    this.role = toCamelCase(this.role);
  }
  this.companyName = toCamelCase(this.companyName);
  this.address = toCamelCase(this.address);
  if (this.isWorkingHere) {
    const now = new Date();
    this.toMonth = MONTHS[now.getMonth()];
    this.toYear = now.getFullYear();
  } else {
    const monthDays = moment({
      month: MONTHS.indexOf(this.toMonth),
      year: this.toYear,
    }).daysInMonth();
    this.endDate = moment({
      day: monthDays,
      month: MONTHS.indexOf(this.toMonth),
      year: this.toYear,
    }).format();
  }
  // month
  this.startDate = moment({ month: MONTHS.indexOf(this.fromMonth), year: this.fromYear }).format();
  this.duration = !this.isWorkingHere
    ? `${this.fromMonth}, ${this.fromYear} - ${this.toMonth}, ${this.toYear}`
    : `${this.fromMonth}, ${this.fromYear} - Present`;
  next();
});

/**
 * Relationships
 */
// JobExperience.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
JobExperience.defaultColumns = 'companyName, role, address, candidateId';
JobExperience.register();
