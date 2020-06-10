const config = require('../../infra/configs/global_config');
const wrapper = require('../utils/wrapper');
const logger = require('../utils/logger');
const nodemailer = require('nodemailer');
let transporter;

const init = () => {
  transporter = nodemailer.createTransport(config.get('/email'));
  logger.log('transporter-init', 'transporter initialized', 'info');
};

const sendMail = async (mailOptions) => {
  try {
    let result = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          reject(error);
        }
        resolve('Send Email Success');
      });
    });
    return Promise.resolve(result)
      .then(res => wrapper.data(res))
      .catch(err => wrapper.error(`Send Email Error ${err}`));
  } catch (err) {
    logger.log('info', 'error send email', 'User - doSendFeedback.transporter.sendMail');
    return wrapper.error(err);
  }
};

module.exports = {
  init,
  sendMail
};
