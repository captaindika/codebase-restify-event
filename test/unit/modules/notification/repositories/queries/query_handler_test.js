const queryHandler = require('../../../../../../bin/modules/notification/repositories/queries/query_handler');
const User = require('../../../../../../bin/modules/notification/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('User-queryHandler', () => {

  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    'email': 'testing@gmail.com',
    'otp': 1234
  };

  describe('sendOtpLogin', () => {

    it('should return success and sendOtpLogin', async() => {
      sinon.stub(User.prototype, 'sendOtpLogin').resolves(data);

      const rs = await queryHandler.sendOtpLogin(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.sendOtpLogin.restore();
    });
  });
});
