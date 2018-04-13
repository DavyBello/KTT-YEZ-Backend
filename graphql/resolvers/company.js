const keystone = require('keystone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CompanyTC } = require('../composers');
const Company = keystone.list('Company').model;

module.exports = () => {
  CompanyTC.addResolver({
    kind: 'mutation',
    name: 'loginWithEmail',
    description: 'login a company',
    args: {email: 'String!', password: 'String!'},
    type: CompanyTC,
    resolve: async ({ args, context }) => {
      console.log(' login this ----');
      const { email, password } = args;
      //console.log(context);
      return Company.findOne({email}).then((company) => {
        if (company) {
          // validate password
          return bcrypt.compare(password, company.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: company.id,
                //email: company.email,
                email: company.email,
                type: 'Company',
                //passwordVersion: company.passwordVersion,
              }, process.env.JWT_SECRET);
              company.jwt = token;
              context.company = Promise.resolve(company);
              return company;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('email/company not found');
      });
    },
  })

  CompanyTC.addResolver({
    kind: 'mutation',
    name: 'signUp',
    description: 'signUp a company',
    args: {firstName: 'String!', lastName: 'String!', phone: 'String!', password: 'String!'},
    type: CompanyTC,
    resolve: async ({ args, context }) => {
      // console.log('company signUp this ----');
      const { firstName, lastName, phone, password } = args;

      return Company.findOne({phone}).then((existing) => {
        if (!existing) {
          // hash password and create user
          const newCompany = new Company({
            phone,
            password: password,
            name: {
              first: firstName,
              last: lastName
            }
          })
          return newCompany.save().then((company)=>{
            const { id, phone } = company;
            //console.log('---' + hash);
            const token = jwt.sign({
              id: company.id,
              //email: company.email,
              phone: company.phone,
              type: 'Company',
              //passwordVersion: company.passwordVersion,
            }, process.env.JWT_SECRET);
            console.log('-----' + company.password);
            company.jwt = token;
            context.company = Promise.resolve(company);
            return company;
          })
          /*return bcrypt.hash(password, 10).then(hash =>
            Company.create({
            phone,
            password: hash,
            name: {
              first: firstName,
              last: lastName
            }
          })).then((company) => {
            const { id, phone } = company;
            console.log('---' + hash);
            const token = jwt.sign({
              id: company.id,
              //email: company.email,
              phone: company.phone,
              type: 'Company',
              //passwordVersion: company.passwordVersion,
            }, process.env.JWT_SECRET);
            console.log('-----' + company.password);
            company.jwt = token;
            context.company = Promise.resolve(company);
            return company;
          });*/
        }
        return Promise.reject('phone already Exists');
      })
    },
  })
}
