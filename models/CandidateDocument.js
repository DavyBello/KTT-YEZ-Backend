var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CandidateDocument Model
 * ==========
 */
var CandidateDocument = new keystone.List('CandidateDocument');

CandidateDocument.add({
	fileTitle : { type: Types.Text, initial: true, required: true},
	fileURL : { type: Types.Text, initial: true, required: true},
	image: { type: Types.CloudinaryImage, initial: true},
	uploadedBy : { type: Types.Relationship, ref: 'CenterManager', many: false, initial:true, required: true },
	createdAt : { type: Types.Date, index: true, default: Date.now, required: true},
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
