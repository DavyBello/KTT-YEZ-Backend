var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Candidate Model
 * ==========
 */
var Candidate = new keystone.List('Candidate');
Candidate.schema.set('usePushEach', true);

Candidate.add({
	name: { type: Types.Name, required: true, index: true },
	phone: { type: Types.Text, initial: true, required: true},
	username: { type: Types.Text, initial: true},
	email: { type: Types.Email, initial: true, required: false, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	passwordVersion: { type: Types.Text, initial: false, required: true, default: 1},
	category: {type: Types.Select, options: ['seeker','startup','employed']}
}, 'Details', {
	address: { type: Types.Text},
	imageUrl: { type: Types.Text},
	bvn: { type: Types.Text},
	gender: {type: Types.Select, options: ['male','female','other']},
	dateOfBirth: { type: Types.Date },
	placeOfBirth: { type: Types.Text},
	nationality: { type: Types.Text},
	stateOfOrigin: { type: Types.Text},
}, 'Status', {
	isEmployed: { type: Boolean, index: true },
	isVerified: { type: Boolean, index: true },
}, 'Results', {
	result: {
		skillAnalysis: { type: Types.Relationship, ref: 'SkillAnalysisResult', many: false },
		seeker: { type: Types.Relationship, ref: 'SeekerResult', many: false },
		startup: { type: Types.Relationship, ref: 'StartupResult', many: false },
	}
}, 'Refrees', {
	refrees: { type: Types.Relationship, ref: 'Refree', many: true },
}, 'Qualifications', {
	experience: { type: Types.Relationship, ref: 'JobExperience', many: true },
	education: { type: Types.Relationship, ref: 'Education', many: true },
	certificates: { type: Types.Relationship, ref: 'Certificate', many: true },
}, 'verification', {
	documentsUploaded: { type: Types.Relationship, ref: 'CandidateDocument', many: true },
	//documents: { type: Types.Relationship, ref: 'CandidateDocument', many: true },
}, 'Case File', {
	caseFile: { type: Types.Text, initial: false, required: true, default: 1},
});

// Provide access to Keystone
Candidate.schema.virtual('isTested').get(() => {
	if (this.result.seeker || this.result.startup)
		return true;
	return false;
});
Candidate.schema.virtual('testTaken').get(() => {
	if (this.result.seeker && this.result.startup)
		return 'both';
	if (this.result.seeker)
		return 'seeker';
	if (this.result.startup)
		return 'startup';
	return 'none';
});

/**
 * Relationships
 */
//Candidate.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Candidate.defaultColumns = 'name, phone, email, category';
Candidate.register();
