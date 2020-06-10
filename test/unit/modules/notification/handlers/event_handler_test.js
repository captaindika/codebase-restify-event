const sinon = require('sinon');
const { expect } = require('chai');
const queryHandler = require('../../../../../bin/modules/notification/repositories/queries/query_handler');
const eventHandler = require('../../../../../bin/modules/notification/handlers/event_handler');

describe('Notification event Handler', () => {

  let res;

  const req = {
    body: {},
    params: {},
    query: {},
    authorization: {
      credentials: 'xx'
    }
  };

  const resultSucces = {
    err: null,
    message: 'success',
    data: [],
    code: 200
  };

  const resultError = {
    err: true
  };

  beforeEach(() => {
    res = {
      send: function () {
        return true;
      }
    };
  });

  describe('sendOtpLogin', () => {

    it('should return error', async() => {

      sinon.stub(queryHandler, 'sendOtpLogin').resolves(resultError);
      expect(await eventHandler.sendOtpLogin(req, res));
      queryHandler.sendOtpLogin.restore();
    });
    it('should return success', async() => {

      sinon.stub(queryHandler, 'sendOtpLogin').resolves(resultSucces);
      expect(await eventHandler.sendOtpLogin(req, res));
      queryHandler.sendOtpLogin.restore();
    });
  });
});
