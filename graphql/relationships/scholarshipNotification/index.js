const {
  ScholarshipNotificationTC,
  ScholarshipLevelTC,
  ScholarshipCourseTC,
} = require('../../composers');
// const wrapWithDefaultValue = require('../../logic/common/wrapWithDefaultValue');


ScholarshipNotificationTC.addRelation('level', {
  resolver: () => ScholarshipLevelTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.level,
  },
  projection: { level: 1 },
});

ScholarshipNotificationTC.addRelation('courses', {
  resolver: () => ScholarshipCourseTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.courses,
  },
  projection: { courses: 1 },
});
