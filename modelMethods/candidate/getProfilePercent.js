const keystone = require('keystone');

const Education = keystone.list('Education').model;
const Referee = keystone.list('Referee').model;

module.exports = async function () {
  const fields = [
    'firstName',
    'lastName',
    'phone',
    'username',
    'email',
    'dateOfBirth',
    'address',
    'stateOfResidence',
    'imageUrl',
    'gender',
  ];

  const countArray = fields.map(field => (!this[field] ? 0 : 1));
  countArray.push((await Education.find({ candidateId: this._id }).count() > 1) ? 1 : 0);
  countArray.push((await Referee.find({ candidateId: this._id }).count() > 1) ? 1 : 0);

  return (countArray.reduce((a, b) => a + b) / countArray.length) * 100;
};
