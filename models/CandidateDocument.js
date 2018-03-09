var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CandidateDocument Model
 * ==========
 */
var CandidateDocument = new keystone.List('CandidateDocument');

CandidateDocument.add({
	fileTitle : { type: Types.Text},
	fileURL : { type: Types.Text},
	uploadedBy : { type: Types.Text},
	createdAt : { type: Types.Date, index: true, default: Date.now },
	updatedAt : { type: Types.Date, index: true },
});

// Provide access to Keystone
/*CandidateDocument.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});*/


/**
 * Relationships
 */
//CandidateDocument.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
CandidateDocument.defaultColumns = 'fileTitle, fileURL, createdAt';
CandidateDocument.register();
