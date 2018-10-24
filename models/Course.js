const { List } = require('keystone');

/**
 * Course Model
 * ==================
 */

const Course = new List('Course', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Course.add({
  name: { type: String, required: true },
});

Course.relationship({ ref: 'Company', path: 'Companies', refPath: 'industries' });

Course.register();
