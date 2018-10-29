module.exports = {
  noviewUserFields: ['password', 'passwordVersion'],
  noeditUserFields: ['password', 'passwordVersion', 'isVerified'],
  track: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'],
  idFields: ['_id'],
};
