/* eslint-disable func-names */
const keystone = require('keystone');

const { Types } = keystone.Field;

/**
 * CaseFile Model
 * ==========
 */

const CaseFile = new keystone.List('CaseFile', {
  map: { name: 'title' },
});

CaseFile.add({
  title: { type: String, required: true },
  candidateId: { type: Types.Relationship, ref: 'Candidate', index: true },
  fileNumber: {
    type: Types.Number, default: 1, required: true, index: true,
  },
  // author: { type: Types.Relationship, ref: 'CenterManager', index: true },
  createdAt: { type: Types.Datetime, index: true, default: Date.now() },
  content: { type: Types.Html, wysiwyg: true, height: 200 },
});

CaseFile.defaultColumns = 'title, candidate|20%, createdAt|20%, candidateId';
CaseFile.register();
