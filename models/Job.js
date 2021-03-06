const keystone = require('keystone');

const { Types } = keystone.Field;

const { STATES } = require('../lib/common');

/**
 * Job Model
 * ==========
 */
const Job = new keystone.List('Job', {
  track: true,
});

const typeOptions = [
  { value: 'fullTime', label: 'Full-time' },
  { value: 'partTime', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'internship', label: 'Internship' },
];

Job.add({
  role: {
    type: String, required: true, index: true, initial: true,
  },
  companyId: {
    type: Types.Relationship, ref: 'Company', required: true, initial: true,
  },
  state: { type: Types.Select, options: STATES },
  basicDescription: { type: Types.Textarea, initial: true },
  fullDescription: { type: Types.Textarea, initial: true },
  vacancy: { type: Types.Text, initial: true },
  employmentType: { type: Types.Select, options: typeOptions },
  industry: { type: Types.Relationship, ref: 'Industry', many: false },
  salary: { type: Types.Text, initial: true, required: false },
  publishedDate: {
    type: Date, index: true, initial: true, default: Date.now,
  },
  expiryDate: { type: Date, index: true, initial: true },
}, 'Contact', {
  contactEmail: { type: Types.Text, initial: true },
  contactPhone: { type: Types.Text, initial: true },
  contactName: { type: Types.Text, initial: true },
}, 'Status', {
  isVacant: { type: Boolean, default: false, index: true },
  isOnDisplay: { type: Boolean, default: false, index: true },
}, 'Requirements', {
  // address: { type: Types.Text, initial: true },
});


/**
 * Relationships
 */
// Job.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Job.defaultColumns = 'role, companyId, industry';
Job.register();
