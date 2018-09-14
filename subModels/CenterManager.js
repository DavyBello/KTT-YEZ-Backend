const keystone = require('keystone');

const { Types } = keystone.Field;
const ModelMethods = require('../modelMethods/manager');

const {
  STATES, PHONE_REGEX, toCamelCase,
} = require('../lib/common');

/**
 * CenterManager Model
 * ==========
 */
const CenterManager = new keystone.List('CenterManager', {
  track: true,
  hidden: false,
  inherits: keystone.list('User'),
});

CenterManager.add({
  name: { type: Types.Name, required: true, index: true },
  phone: {
    type: Types.Text, initial: true, required: true, unique: true,
  },
  email: {
    type: Types.Email, initial: true, required: false, unique: true, index: true, sparse: true,
  },
  password: { type: Types.Password, initial: true, required: true },
  passwordVersion: {
    type: Types.Text, initial: false, required: true, default: 1,
  },
}, 'Details', {
  address: { type: Types.Text },
  stateOfResidence: { type: Types.Select, options: STATES },
  imageUrl: { type: Types.Text },
  // bvn: { type: Types.Text},
  // gender: {type: Types.Select, options: GENDERS},
  // dateOfBirth: { type: Types.Date },
  // placeOfBirth: { type: Types.Text},
  // nationality: { type: Types.Text},
  // stateOfOrigin: { type: Types.Text},
});

// Model Hooks
CenterManager.schema.pre('save', function preSave(next) {
  this.name.first = toCamelCase(this.name.first);
  this.name.last = toCamelCase(this.name.last);
  if (PHONE_REGEX.test(this.phone)) {
    next();
  } else {
    next(new Error('Invalid Phone Number'));
  }
});

// Methods
const { sendActivationLink } = ModelMethods;

CenterManager.schema.methods.sendActivationLink = sendActivationLink;

/**
 * Registration
 */
CenterManager.defaultColumns = 'name, phone, email, stateOfResidence';
CenterManager.register();
