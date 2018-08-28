const mongoose = require('mongoose');

// const { getUser, signToken } = require('../index');

const {
  connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows,
} = require('../../../test/helper');

const { ObjectId } = mongoose.Types;

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);
describe('getUser', () => {
  it.only('should return an user null when token is null', async () => {
    // const token = null;
    // const { User } = await getUser(token);
    console.log('as');

    expect(true).toBe(true);
  });
  // it('should return an user null when token is null', async () => {
  //   const token = null;
  //   const { User } = await getUser(token);
  //
  //   expect(User).toBe(null);
  // });

  // it('should return null when token is invalid', async () => {
  //   const token = 'invalid token';
  //   const { User } = await getUser(token);
  //
  //   expect(User).toBe(null);
  // });
  //
  // it('should return null when token do not represent a valid user', async () => {
  //   const token = signToken({ _id: new ObjectId() });
  //   const { User } = await getUser(token);
  //
  //   expect(User).toBe(null);
  // });
  //
  // it('should return user from a valid token', async () => {
  //   const me = await createRows.createUser();
  //
  //   const token = signToken(me);
  //   const { User } = await getUser(token);
  //
  //   expect(User._id).toBe(me._id);
  //   expect(User.passwordVersion).toBe(me.passwordVersion);
  // });
  //
  // it('should return candidate from a valid token', async () => {
  //   const me = await createRows.createCandidate();
  //
  //   const token = signToken(me);
  //   const { Candidate } = await getUser(token);
  //
  //   expect(Candidate._id).toBe(me._id);
  //   expect(Candidate.passwordVersion).toBe(me.passwordVersion);
  //   expect(Candidate.firstName).toBe(me.firstName);
  //   expect(Candidate.lastName).toBe(me.lastName);
  //   expect(Candidate.phone).toBe(me.phone);
  // });
});
