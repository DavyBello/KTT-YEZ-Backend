const keystone = require('keystone');

const router = keystone.express.Router();

const Candidate = keystone.list('Candidate').model;

const demoCandidate = new Candidate({
  name: 'John Doe',
  lastName: 'John',
  firstName: 'Doe',
  email: 'example@example.com',
});

const routes = {
  '/password-reset': async (req, res) => {
    const { html } = await demoCandidate.getPasswordResetLinkEmail().render();
    res.send(html);
  },
  '/candidate-activation': async (req, res) => {
    const { html } = await demoCandidate.getActivationLinkEmail().render();
    res.send(html);
  },
};

/* higher order function */
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
