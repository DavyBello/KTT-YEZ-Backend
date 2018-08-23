const keystone = require('keystone');

const Types = keystone.Field.Types;
const moment = require('moment');

const { MONTHS, toCamelCase } = require('../lib/common');

/**
 * Education Model
 * ==========
 */
const Education = new keystone.List('Education', {
  map: { name: 'school' },
});

Education.add({
  school: { type: Types.Text, initial: true, required: true },
  candidateId: { type: Types.Relationship, ref: 'Candidate', index: true },
  degree: { type: Types.Text, initial: true, required: true },
  field: { type: Types.Text, initial: true, required: true },
  grade: { type: Types.Text, initial: true },
  // fromMonth: {type: Types.Select, options: MONTHS, initial: true},
  fromYear: { type: Types.Text, initial: true, required: true },
  isSchoolingHere: { type: Boolean, initial: true, default: false },
  // toMonth: {type: Types.Select, options: MONTHS, initial: true},
  toYear: { type: Types.Text, initial: true, required: true },
  duration: { type: Types.Text },
  startDate: { type: Types.Date, index: true },
}, 'verification', {
  isVerified: { type: Boolean, initial: true },
});

// Model Hooks
Education.schema.pre('save', function (next) {
  this.school = toCamelCase(this.school);
  this.field = toCamelCase(this.field);
  this.startDate = moment({ year: this.fromYear }).format();
  // this.duration = `${this.fromYear} - ${this.toYear}`;
  this.duration = !this.isSchoolingHere
    ? `${this.fromYear} - ${this.toYear}` : `${this.fromYear} - Present`;
  next();
});

/**
 * Registration
 */
Education.defaultColumns = 'school, degree, field, candidateId';
Education.register();
