const User = require('../../../../../../bin/modules/notification/repositories/queries/domain');
const mailer = require('../../../../../../bin/helpers/utils/nodemailer');
const sinon = require('sinon');
const assert = require('assert');


describe('UserQuery', () => {

  describe('sendOtpLogin', async () => {
    const db = {
      setCollection: sinon.stub()
    };

    const user = new User(db);
    it('should return error cant send email', async () => {
      const payload = {
        value: '{"userId": "057ab5aa-5866-4bb6-b74b-ada64c950db4","email": "testing@gmail.com","otp": "1234"}'
      };
      sinon.stub(mailer, 'sendMail').resolves({err: true, data: ''});
      const result = await user.sendOtpLogin(payload);
      mailer.sendMail.restore();
      assert.notEqual(result.err, null);
    });

    it('should return success send email', async () => {
      const payload = {
        value: '{"userId": "057ab5aa-5866-4bb6-b74b-ada64c950db4","email": "testing@gmail.com","otp": "1234"}'
      };
      sinon.stub(mailer, 'sendMail').resolves({err: null, data: 'success'});
      const result = await user.sendOtpLogin(payload);
      mailer.sendMail.restore();
      assert.equal(result.data, 'success');
    });
  });
});
