
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { ConflictError, NotFoundError } = require('../../../../helpers/error');
const mailer = require('../../../../helpers/utils/nodemailer');
const mustache = require('mustache');
const fs = require('fs');

class User {

  constructor(db){
    this.query = new Query(db);
  }

  async sendOtpLogin(data){
    const ctx = 'sendOtpLogin';
    const value = JSON.parse(data.value);
    const dataEmail = value;
    const html = fs.readFileSync('./files/mailtemplate/otp-login.html', 'utf8');
    const renderHtml = mustache.to_html(html, dataEmail);
    const mailOptions = {
      from: 'codebase-cqrs@gmail.com',
      to: `${value.email}`,
      subject: '[CodebaseCQRS] OTP Login',
      html: renderHtml
    };
    const result = await mailer.sendMail(mailOptions);
    if(result.err){
      logger.error(ctx,'error', 'User - doSendFeedback.transporter.sendMail',result.err);
      return wrapper.error(new ConflictError('Cant send email'));
    }
    logger.info(ctx,'success', 'send email success',result);
    return wrapper.data('success', 'send email success', 200);
  }

  async checkUserById(payload) {
    const user = await this.query.findOneUser(payload);
    if (user.err) {
      return wrapper.error(new NotFoundError('Can not find notification'));
    }
    const { data } = user;
    return wrapper.data(data);
  }

}

module.exports = User;
