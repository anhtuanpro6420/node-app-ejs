const cron = require('node-cron');

const mailServices = require('../mail/mail');
const { EMAIL } = require('../../config/env-variables');

const mailTask = cron.schedule(
  '*/10 * * * * *',
  () => {
    console.log('running a task every 10s');
    const mailOptions = {
      from: EMAIL,
      to: 'anhtuanpro6421@yopmail.com',
      subject: 'Test mail',
      text: 'Test mail node app',
      html: '<b>Hello world</b>',
    };
    mailServices.sendMail(mailOptions);
  },
  {
    scheduled: false,
  }
);

module.exports = {
  mailTask,
};
