/* eslint-disable func-names */
const keystone = require('keystone');

const { Types } = keystone.Field;
const ModelMethods = require('../modelMethods/user/index.js');

const { PHONE_REGEX, toCamelCase } = require('../lib/common');

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User', {
  hidden: true,
});

User.add({
  name: { type: Types.Text, index: true },
  email: {
    type: Types.Email, initial: true, required: true, unique: true, index: true, sparse: true
  },
  password: { type: Types.Password, initial: true, required: true },
  passwordVersion: { type: Types.Number, required: true, default: 1 },
});

// Model Hooks
User.schema.pre('save', (next) => {
  // this.wasNew = this.isNew;

  if (this.name) this.name = toCamelCase(this.name);

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
const { sendPasswordResetLink, signToken } = ModelMethods;

User.schema.methods.sendPasswordResetLink = sendPasswordResetLink;
User.schema.methods.signToken = signToken;


/**
 * Registration
 */
User.defaultColumns = 'name, email';
User.register();
