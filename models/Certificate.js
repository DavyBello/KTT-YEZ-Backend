const keystone = require('keystone');

const Types = keystone.Field.Types;
const moment = require('moment');

const { MONTHS, toCamelCase } = require('../lib/common');

/**
 * Certificate Model
 * ==========
 */
const Certificate = new keystone.List('Certificate', {
  map: { name: 'title' },
});

Certificate.add({
  title: { type: Types.Text, initial: true, required: true },
  candidateId: { type: Types.Relationship, ref: 'Candidate', index: true },
  authority: { type: Types.Text, initial: true, required: true },
  licenseNumber: { type: Types.Text, initial: true },
  url: { type: Types.Text, initial: true },
  fromMonth: { type: Types.Select, options: MONTHS, initial: true },
  fromYear: { type: Types.Text, initial: true, required: false },
  doesNotExpire: { type: Boolean, initial: true, default: false },
  toMonth: { type: Types.Select, options: MONTHS, initial: true },
  toYear: { type: Types.Text, initial: true, required: false },
  duration: { type: Types.Text },
  startDate: { type: Types.Date, index: true },
}, 'verification', {
  isVerified: { type: Boolean, initial: true, default: false },
});

// Model Hooks
Certificate.schema.pre('save', function (next) {
  this.title = toCamelCase(this.title);
  this.authority = toCamelCase(this.authority);

  this.startDate = moment({ year: this.fromYear }).format();
  this.duration = !this.doesNotExpire
    ? `${this.fromMonth}, ${this.fromYear} - ${this.toMonth}, ${this.toYear}`
    : `${this.fromMonth}, ${this.fromYear} - Present`;
  next();
});

/**
 * Registration
 */
Certificate.defaultColumns = 'title, authority, licenseNumber, isVerified, candidateId';
Certificate.register();
