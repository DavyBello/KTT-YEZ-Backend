const { List } = require('keystone');

/**
 * ScholarshipCourse Model
 * ==================
 */

const ScholarshipCourse = new List('ScholarshipCourse', {
  autokey: { from: 'name', path: 'key', unique: true },
});

ScholarshipCourse.add({
  name: { type: String, required: true },
});

// ScholarshipCourse.relationship({ ref: 'Company', path: 'Companies', refPath: 'industries' });

ScholarshipCourse.register();
