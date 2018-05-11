const { CandidateTC, JobExperienceTC, EducationTC, CertificateTC, RefereeTC, CandidateDocumentTC } = require('../composers');

module.exports = () => {
  CandidateTC.addRelation('experience', {
      resolver: () => JobExperienceTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.experience,
      },
      projection: { experience: true }, // point fields in source object, which should be fetched from DB
    }
  );
  CandidateTC.addRelation('education', {
      resolver: () => EducationTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.education,
      },
      projection: { education: true }, // point fields in source object, which should be fetched from DB
    }
  );
  CandidateTC.addRelation('certificates', {
      resolver: () => CertificateTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.certificates,
      },
      projection: { certificates: true }, // point fields in source object, which should be fetched from DB
    }
  );
  CandidateTC.addRelation('referees', {
      resolver: () => RefereeTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.referees,
      },
      projection: { referees: true }, // point fields in source object, which should be fetched from DB
    }
  );
  CandidateTC.addRelation('documents', {
      resolver: () => CandidateDocumentTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.documentsUploaded,
      },
      projection: { documentsUploaded: true }, // point fields in source object, which should be fetched from DB
    }
  );
}
