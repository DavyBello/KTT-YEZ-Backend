const keystone = require('keystone');

const { Field: { Types }, List } = keystone;

/**
 * CandidateEnquiry Model
 * =============
 */

const CandidateEnquiry = new List('CandidateEnquiry', {
  nocreate: true,
  noedit: true,
});

CandidateEnquiry.add({
  name: { type: Types.Text, required: true },
  email: { type: Types.Email, required: true },
  subject: { type: Types.Text, required: true },
  message: { type: Types.Textarea, required: true },
  createdAt: { type: Types.Date, default: Date.now },
});

CandidateEnquiry.schema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

CandidateEnquiry.schema.post('save', function () {
  if (this.wasNew) {
    try {
      this.sendNotificationEmail();
      this.sendConfirmationEmail();
    } catch (e) {
      console.log(e);
    }
  }
});

CandidateEnquiry.schema.methods.sendNotificationEmail = function () {
  const enquiry = this;

  return new Promise(((resolve, reject) => {
    console.log('sending enquiry confirmation email');

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.log('Unable to send email - no mailgun credentials provided');
      reject(new Error('could not find mailgun credentials'));
    }

    const brand = keystone.get('brand');

    keystone.list('keystoneJpAdmin').model.find({ isAdmin: true, recieveJpGuestEnquiries: true }).exec((err, admins) => {
      if (err) {
        reject(err);
      }
      new keystone.Email({
        templateName: 'guest-enquiry-notification',
        transport: 'mailgun',
      }).send({
        to: admins,
        from: {
          name: 'Youth Empowerment Zone(YEZ) Nigeria',
          email: 'contact@yeznigeria.org',
        },
        subject: 'New Guest Enquiry for Youth Empowerment Zone(YEZ) Nigeria',
        enquiry,
        brand,
      }, (e) => {
        if (e) {
          console.log(e);
          reject(e);
        }
      });
      resolve();
    });
  }));
};

// guest-enquiry-confirmation
CandidateEnquiry.schema.methods.sendConfirmationEmail = function () {
  const enquiry = this;
  return new Promise(((resolve, reject) => {
    console.log('sending enquiry confirmation email');

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.log('Unable to send email - no mailgun credentials provided');
      reject(new Error('could not find mailgun credentials'));
    }

    const brandDetails = keystone.get('brandDetails');

    new keystone.Email({
      templateName: 'guest-enquiry-confirmation',
      transport: 'mailgun',
    }).send({
      to: [enquiry.email],
      from: {
        name: 'Youth Empowerment Zone(YEZ) Nigeria',
        email: 'no-reply@yeznigeria.org',
      },
      subject: 'Youth Empowerment Zone(YEZ) Nigeria Enquiry',
      enquiry,
      brandDetails,
    }, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    resolve();
  }));
};

CandidateEnquiry.defaultSort = '-createdAt';
CandidateEnquiry.defaultColumns = 'name, email, createdAt';
CandidateEnquiry.register();
