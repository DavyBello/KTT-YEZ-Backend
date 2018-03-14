const { CandidateTC, JobExperienceTC } = require('../composers');

module.exports = () => {
  CandidateTC.addRelation('experience', {
      resolver: () => JobExperienceTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.experience,
      },
      projection: { experience: true }, // point fields in source object, which should be fetched from DB
    }
  );
}
