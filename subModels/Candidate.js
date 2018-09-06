/* eslint-disable func-names */
const keystone = require('keystone');

const { Types } = keystone.Field;
const ModelMethods = require('../modelMethods/candidate/index.js');

const {
  STATES, GENDERS, CANDIDATE_CATEGORIES, toCamelCase,
} = require('../lib/common');

/**
 * Candidate Model
 * ==========
 */
const Candidate = new keystone.List('Candidate', {
  track: true,
  hidden: false,
  inherits: keystone.list('User'),
});

Candidate.add('Candidate', {
  // name: { type: Types.Text, index: true },
  firstName: {
    type: Types.Text, required: true, initial: true, index: true,
  },
  lastName: {
    type: Types.Text, required: true, initial: true, index: true,
  },
  phone: {
    type: Types.Text, initial: true, unique: true, sparse: true,
  },
  username: {
    type: Types.Text, initial: true, required: false, unique: true, index: true, sparse: true,
  },
  isActivated: { type: Boolean, default: false, noedit: true },
  category: { type: Types.Select, options: CANDIDATE_CATEGORIES },
}, 'Details', {
  address: { type: Types.Text },
  stateOfResidence: { type: Types.Select, options: STATES },
  imageUrl: { type: Types.Text },
  // bvn: { type: Types.Text},
  gender: { type: Types.Select, options: GENDERS },
  dateOfBirth: { type: Types.Date },
  placeOfBirth: { type: Types.Text },
  nationality: { type: Types.Text },
  stateOfOrigin: { type: Types.Select, options: STATES },
}, 'Status', {
  isEmployed: { type: Boolean, index: true },
  isVerified: { type: Boolean, index: true },
});

// Virtuals
Candidate.schema.virtual('isTested').get(function () {
  if (this.result.seeker || this.result.startup) return true;
  return false;
});
Candidate.schema.virtual('testTaken').get(function () {
  if (this.result.seeker && this.result.startup) return 'both';
  if (this.result.seeker) return 'seeker';
  if (this.result.startup) return 'startup';
  return 'none';
});

// Model Hooks
Candidate.schema.pre('save', async function (next) {
  if (this.firstName) this.firstName = toCamelCase(this.firstName);
  if (this.lastName) this.lastName = toCamelCase(this.lastName);
  this.name = `${this.lastName} ${this.firstName}`;
  next();
});

Candidate.schema.post('save', async function () {
  if (this.wasNew) {
    try {
      // this.sendActivationLink();
    } catch (e) {
      console.log(e);
    }
  }
});

// Methods
// Methods
const { sendActivationLink } = ModelMethods;

Candidate.schema.methods.sendActivationLink = sendActivationLink;

/**
 * Relationships
 */
Candidate.relationship({ ref: 'Education', path: 'education', refPath: 'candidateId' });
Candidate.relationship({ ref: 'JobExperience', path: 'experience', refPath: 'candidateId' });
Candidate.relationship({ ref: 'CandidateDocument', path: 'documents', refPath: 'candidateId' });
Candidate.relationship({ ref: 'Certificate', path: 'certificates', refPath: 'candidateId' });
Candidate.relationship({ ref: 'CaseFile', path: 'caseFiles', refPath: 'candidateId' });

/**
 * Registration
 */
Candidate.defaultColumns = 'name, phone, email';
Candidate.register();
