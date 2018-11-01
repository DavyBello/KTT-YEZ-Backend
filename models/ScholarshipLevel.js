const keystone = require('keystone');

/**
 * ScholarshipLevel Model
 * ==================
 */

const ScholarshipLevel = new keystone.List('ScholarshipLevel', {
  autokey: { from: 'name', path: 'key', unique: true },
});

ScholarshipLevel.add({
  name: { type: String, required: true },
});

ScholarshipLevel.register();
