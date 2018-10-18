const chai = require('chai');

const handleEmail = require('../handleEmail');

// const {
//   connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows, getContext
// } = require('../../../../__tests__/helper');

const { expect } = chai;

describe('handleEmail', () => {
  it('should render an email when the params are correct', async () => {
      const hmtl = await handleEmail({
        method: 'render',
        options: {
        templateName: 'user/activate-account',
        transport: 'mailgun',
        },
        locals: {
        to: [user.email],
        from: {
            name: 'Youth Empowerment Zone (YEZ)',
            email: 'no-reply@yeznigeria.org',
        },
        subject: 'Youth Empowerment Zone (YEZ) Account Activation',
        user,
        brandDetails,
        activationLink,
        },
    });
    
    expect(decodedToken).to.be.deep.equal({});
  });
});
