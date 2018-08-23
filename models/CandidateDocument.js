const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * CandidateDocument Model
 * ==========
 */
const CandidateDocument = new keystone.List('CandidateDocument', {
  map: { name: 'fileTitle' },
});

CandidateDocument.add({
  fileTitle: { type: Types.Text, initial: true, required: true },
  fileURL: { type: Types.Text },
  image: { type: Types.CloudinaryImage, initial: true },
  // uploadedBy : { type: Types.Relationship, ref: 'CenterManager', index: true, initial:true, required: true },
  createdAt: { type: Types.Datetime, index: true, default: Date.now },
  updatedAt: { type: Types.Datetime, index: true },
  candidateId: {
    type: Types.Relationship, ref: 'Candidate', initial: true, required: true, index: true,
  },
});

// Model Hooks
CandidateDocument.schema.pre('save', function (next) {
  this.fileURL = this.image.url;
  next();
});

/**
 * Registration
 */
CandidateDocument.defaultColumns = 'fileTitle, fileURL, createdAt, candidateId';
CandidateDocument.register();
