const keystone = require('keystone');

const Types = keystone.Field.Types;

const { PHONE_REGEX, toCamelCase } = require('../lib/common');

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User');

User.add({
  name: { type: Types.Text, index: true },
  email: {
    type: Types.Email, initial: true, required: true, unique: true, index: true,
  },
  password: { type: Types.Password, initial: true, required: true },
  passwordVersion: { type: Types.Number, required: true, default: 1 },
});

// Model Hooks
User.schema.pre('save', function (next) {
  this.wasNew = this.isNew;

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

/**
 * Registration
 */
User.defaultColumns = 'name, email';
User.register();
