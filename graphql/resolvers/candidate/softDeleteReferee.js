const keystone = require('keystone');
const { UserInputError } = require('apollo-server');

const Referee = keystone.list('Referee').model;

module.exports = {
  kind: 'mutation',
  name: 'softDeleteReferee',
  description: 'delete candidate referee',
  args: {
    _id: 'MongoID!',
  },
  type: 'RemoveByIdRefereePayload',
  resolve: async ({ args, context: { viewer } }) => {
    const { _id } = args;
    try {
      const referee = await Referee.findOne({ _id, candidateId: viewer._id });
      if (referee) {
        // if (`${referee.candidateId}` !== `${viewer._id}`) {
        //   return Promise.reject(new UserInputError('this user cannot delete this document'));
        // }
        // soft delete referee
        referee.d = true;
        await referee.save();

        return {
          recordId: referee._id,
          record: referee,
        };
      }
      return Promise.reject(new UserInputError('referee not found'));
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
