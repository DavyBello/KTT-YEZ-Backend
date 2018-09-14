const keystone = require('keystone');

/**
 * Industry Model
 * ==================
 */

const Industry = new keystone.List('Industry', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Industry.add({
  name: { type: String, required: true },
});

Industry.relationship({ ref: 'Company', path: 'Companies', refPath: 'industries' });

Industry.register();
