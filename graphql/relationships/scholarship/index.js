const {
  ScholarshipTC,
  ScholarshipLevelTC,
  ScholarshipCourseTC,
} = require('../../composers');

ScholarshipTC.addRelation('levels', {
  resolver: () => ScholarshipLevelTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.levels,
  },
  projection: { levels: 1 },
});

ScholarshipTC.addRelation('courses', {
  resolver: () => ScholarshipCourseTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.courses,
  },
  projection: { courses: 1 },
});
