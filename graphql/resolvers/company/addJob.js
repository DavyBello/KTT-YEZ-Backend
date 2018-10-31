// const keystone = require('keystone');
// const { UserInputError } = require('apollo-server');

const { createNotification } = require('../../../lib/services');
const { JOB_NEW } = require('../../../lib/events');

const { createDocumentWithIdReference } = require('../../logic/common');
const { JobTC } = require('../../composers');

module.exports = createDocumentWithIdReference({
  TC: JobTC,
  refPath: 'companyId',
  onCompleted: (result, { context: { viewer } }) => {
    // console.log(viewer);
    const job = result.record;
    job.companyName = viewer.name;
    createNotification(JOB_NEW, job);
    // createNotification(JOB_NEW, {
    //   ...result.record,
    //   companyName: viewer.name,
    // });
  },
}).clone({
  name: 'addJob',
  description: 'create a new company job',
});
