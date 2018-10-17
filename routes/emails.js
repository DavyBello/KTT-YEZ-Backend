const keystone = require('keystone');

const router = keystone.express.Router();

const Candidate = keystone.list('Candidate').model;

const routes = {
  '/candidate-activation': async (req, res) => {
    const candidate = await Candidate.findOne();
    const html = await candidate.sendActivationLink('render');
    res.send(html);
  },
};

/* higher order function */
// const handlerException = fn => (req, res, next) => {
//   fn(req, res).catch(error => next(error));
// };
const handlerException = fn => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (e) {
    next(e);
  }
};

Object.entries(routes).forEach(([key, value]) => router.get(key, handlerException(value)));

// router
module.exports = router;
