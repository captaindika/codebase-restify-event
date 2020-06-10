const { expect } = require('chai');
const logger = require('../../../../bin/helpers/utils/logger');

describe('Logger', () => {
  describe('log', () => {
    it('expect to be function', () => {
      expect(logger.log).to.be.a('function');
    });
    it('should send log', () => {
      logger.log('', { err: 'test'}, 'ok');
    });
  });
});
