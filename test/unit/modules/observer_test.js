const sinon = require('sinon');
const { expect } = require('chai');
const observer = require('../../../bin/modules/observers');
const logger = require('../../../bin/helpers/utils/logger');

describe('Observer', () => {

  beforeEach(async () => {
    sinon.stub(logger, 'info');
  });

  afterEach(async () => {
    logger.info.restore();
  });

  describe('initEventListener', () => {

    it('should return success', async() => {
      expect(await observer.init());
    });
  });
});
