const keystone = require('keystone');
const { CandidateTC } = require('../composers');
const Candidate = keystone.list('Candidate').model;

module.exports = () => {
  CandidateTC.addResolver({
    kind: 'query',
    name: 'loginWithPhone',
    type: CandidateTC.getType(),
    resolve: (_, args, context) => {
      console.log('candidate login this ----');
      const { phone, password } = args;
      //console.log(context);
      return Candidate.findOne({phone}).then((candidate) => {
        if (candidate) {
          // validate password
          return bcrypt.compare(password, candidate.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: candidate.id,
                //email: candidate.email,
                phone: candidate.phone,
                type: 'Candidate',
                //passwordVersion: candidate.passwordVersion,
              }, process.env.JWT_SECRET);
              candidate.jwt = token;
              context.candidate = Promise.resolve(candidate);
              return candidate;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('phone/candidate not found');
      });
    },
  })
}
