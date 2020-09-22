const nodemailer = require('nodemailer');

const createQueue = require('../queues/createQueue');

const initTransport = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter;
};

const sendMail = async (mailOptions) => {
  const transporter = initTransport();

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendMailQueue = (mailOptions) => {
  const mailQueue = createQueue('mailQueue');
  const queueOptions = {
    attempts: 2,
    // delay: 60000, // 1 min in ms
  };
  mailQueue.add(mailOptions, queueOptions);
  mailQueue.process(async (job) => {
    await sendMail(job.data); // job.data = mailOptions
  });
};

// const sendMutilpleMails = async () => {
//   const mailOptions = [];
//   for (let i = 0; i < 50; i++) {
//     mailOptions.push({
//       from: process.env.EMAIL,
//       to: `anhtuanpro${i}@yopmail.com`,
//       subject: `Test mail ${i}`,
//       text: 'Test mail node app',
//       html: '<b>Hello world</b>',
//     });
//   }

//   const mailQueue = createQueue('mailQueue');
// };

module.exports = {
  sendMail,
  sendMailQueue,
};
