const keystone = require('keystone');

const Types = keystone.Field.Types;
const jwt = require('jsonwebtoken');

const {
  STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase,
} = require('../lib/common');

/**
 * Candidate Model
 * ==========
 */
const Candidate = new keystone.List('Candidate', {
  track: true,
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
Candidate.schema.virtual('isTested').get(() => {
  if (this.result.seeker || this.result.startup) { return true; }
  return false;
});
Candidate.schema.virtual('testTaken').get(() => {
  if (this.result.seeker && this.result.startup) { return 'both'; }
  if (this.result.seeker) { return 'seeker'; }
  if (this.result.startup) { return 'startup'; }
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
      this.sendActivationLink();
    } catch (e) {
      console.log(e);
    }
  }
});

// Methods
Candidate.schema.methods.sendActivationLink = function () {
  const user = this;
  return new Promise(((resolve, reject) => {
    console.log('sending user activation email');
    if (true) {
      // if (user.isActivated) {
      // console.log('Account is already activated');
      reject(new Error('Account is already activated'));
    } else {
      if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        reject(new Error('could not find mailgun credentials'));
      }

      const brandDetails = keystone.get('brandDetails');

      const code = jwt.sign({
        id: user._id,
        createdAt: Date.now(),
      }, process.env.ACTIVATION_JWT_SECRET);
      const activationLink = `${process.env.FRONT_END_URL}/activate?code=${code}`;

      new keystone.Email({
        templateName: 'activate-account',
        transport: 'mailgun',
      }).send({
        to: [user.email],
        from: {
          name: 'MCC',
          email: 'no-reply@mycarrerchoice.global',
        },
        subject: 'MCC Account Activation',
        user,
        brandDetails,
        activationLink,
      }, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
      resolve();
    }
  }));
};

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
