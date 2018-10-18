const { Email } = require('keystone');


module.exports = ({
  method,
  options,
  locals,
}) => new Promise((resolve, reject) => {
  const email = new Email(options);

  switch (method) {
    case 'send':
      if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        reject(Error('could not find mailgun credentials'));
      }
      console.log('sending email');
      email.send(locals, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
      resolve();
      break;
    case 'render':
      console.log('rendering email');
      email.render(locals, (err, { html } = {}) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(html);
      });
      break;
    default:
      reject(Error('invalid method'));
      break;
  }
});
