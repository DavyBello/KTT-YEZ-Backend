const noviewUserFields = ['password', 'passwordVersion'];
const noeditUserFields = ['password', 'passwordVersion'];

module.exports = {
  UserTCOptions: {
    fields: {
      remove: [...noviewUserFields],
    },
  },
  CandidateTCOptions: {
    fields: {
      remove: [...noviewUserFields],
    },
    resolvers: {
      updateById: {
        record: {
          removeFields: [
            ...noeditUserFields,
            'phone',
            'result',
            'category',
            'isVerified',
            'isEmployed',
          ],
        },
      },
    },
  },
  CenterManagerTCOptions: {
    fields: {
      remove: [
        'password',
        'passwordVersion',
        'isVerified',
        'isEmployed',
        'documentsUploaded',
        'caseFile',
      ],
    },
    resolvers: {
      updateById: {
        record: {
          removeFields: [
            'phone',
            'result',
            'category',
            'password',
            'passwordVersion',
            'isVerified',
            'isEmployed',
            'documentsUploaded',
            'caseFile',
            'referees',
            'experience',
            'education',
            'certificates',
            'documentsUploaded',
          ],
        },
      },
    },
  },
  CompanyTCOptions: {
    fields: {
      remove: [
        'password',
        'passwordVersion',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
      ],
    },
    resolvers: {
      updateById: {
        record: {
          removeFields: [
            'jobs',
            'cacRegNo',
            'password',
            'passwordVersion',
            'isVerified',
            'isActive',
          ],
        },
      },
    },
  },
  CaseFileTCOptions: {
    resolvers: {
      createOne: {
        record: {
          removeFields: [
            'fileNumber',
            'authorManager',
            'candidate',
            'owner',
            'createdAt',
          ],
        },
      },
    },
  },
};
