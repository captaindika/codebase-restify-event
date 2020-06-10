
const notificationEventHandler = require('./notification/handlers/event_handler');
const logger = require('../helpers/utils/logger');

const init = () => {
  logger.log('info','Observer is Running...','myEmitter.init');
  initEventListener();
};
const initEventListener = () => {
  notificationEventHandler.sendOtpLogin();
};

module.exports = {
  init: init
};
