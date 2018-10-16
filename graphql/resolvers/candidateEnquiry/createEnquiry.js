const keystone = require('keystone');

const CandidateEnquiry = keystone.list('CandidateEnquiry').model;

const { CandidateEnquiryTC } = require('../../composers');

// module.exports = CandidateEnquiryTC.getResolver('createOne').wrapResolve(next => async (rp) => {
//   // get viewer from resolveParams (rp)
//   const { context: { viewer } } = rp;
//   rp.args.record.name = viewer.name;
//   rp.args.record.email = viewer.email;
//   rp.args.record.createdAt = Date.now();
//   // run createOne resolver
//   const result = await next(rp);
//   return result;
// }).clone({
//   name: 'createEnquiry',
//   // description: 'Create a single post',
// });

module.exports = {
  kind: 'mutation',
  name: 'createEnquiry',
  args: {
    record: `
      input createCandidateEnquiryInput {
        subject: String!
        message: String!
      }
    `,
  },
  description: CandidateEnquiryTC.getResolver('createOne').getDescription(),
  type: CandidateEnquiryTC.getResolver('createOne').getType(),
  resolve: async ({ args, context: { viewer } }) => {
    try {
      const { input: { message, subject } } = args;
      const cEnquiry = new CandidateEnquiry({
        message,
        subject,
        name: viewer.name,
        email: viewer.email,
      });
      await cEnquiry.save();
      return {
        recordId: cEnquiry._id,
        record: cEnquiry,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
