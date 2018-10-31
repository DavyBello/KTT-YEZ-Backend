const keystone = require('keystone');

const { Types } = keystone.Field;
const ModelMethods = require('../modelMethods/candidate/index.js');

const { STATES, PHONE_REGEX, toCamelCase } = require('../lib/common');

/**
 * Company Model
 * ==========
 */
const Company = new keystone.List('Company', {
  track: true,
  hidden: false,
  inherits: keystone.list('User'),
});


const staffOptions = [
  { value: 'a', label: '0 - 1' },
  { value: 'b', label: '2 - 10' },
  { value: 'c', label: '11 - 50' },
  { value: 'd', label: '51 - 200' },
  { value: 'e', label: '201 - 500' },
  { value: 'f', label: '501 - 1000' },
  { value: 'g', label: '1,001 - 5,000' },
  { value: 'h', label: '5,001 - 10,000' },
  { value: 'i', label: '10,000+' },
];

Company.add({
  cName: {
    type: Types.Text, initial: true, required: true, index: true,
  },
  email: {
    type: Types.Email, initial: true, index: true, required: true, unique: true, sparse: true,
  },
  cacRegNo: {
    type: Types.Text, initial: true, index: true, required: true, unique: true, sparse: true,
  },
  phone: { type: Types.Text, initial: true, index: true },
  logoUrl: { type: Types.Text, initial: true },
  website: { type: Types.Text, initial: true },
  address: { type: Types.Text, initial: true },
  stateOfResidence: { type: Types.Select, options: STATES, index: true },
  description: { type: Types.Text, initial: true },
  yearFounded: { type: Types.Number, initial: true, index: true },
  staffSize: { type: Types.Select, options: staffOptions },
  industries: {
    type: Types.Relationship, ref: 'Industry', many: true, initial: true,
  },
  password: { type: Types.Password, initial: true, required: true },
  passwordVersion: {
    type: Types.Text, initial: false, required: true, default: 1,
  },
}, 'Status', {
  isActive: { type: Boolean, default: false, index: true },
  isVerified: { type: Boolean, default: false, index: true },
});

Company.schema.pre('save', function preSave(next) {
  this.name = toCamelCase(this.name);
  this.cName = toCamelCase(this.cName);
  if (this.phone) {
    if (PHONE_REGEX.test(this.phone)) {
      next();
    } else {
      next(new Error('Invalid Phone Number'));
    }
  } else {
    next();
  }
});

// Methods
const { getActivationLinkEmail } = ModelMethods;

Company.schema.methods.getActivationLinkEmail = getActivationLinkEmail;

/**
 * Relationships
 */
Company.relationship({ ref: 'Jobs', path: 'jobs', refPath: 'companyId' });

/**
 * Registration
 */
Company.defaultSort = '-createdAt';
Company.defaultColumns = 'name, phone, email, cacRegNo';
Company.register();
