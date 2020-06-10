const kafkaConsumer = require('../../../helpers/events/kafka/kafka_consumer');
const queryHandler = require('../repositories/queries/query_handler');
const logger = require('../../../helpers/utils/logger');

const sendOtpLogin = async () => {
  const dataConsumer = {
    topic: 'otp-login-codebase',
    groupId: 'cg-otp-login'
  };
  const consumer = new kafkaConsumer(dataConsumer);
  let ctx = 'observers-Init';
  consumer.on('message', async (message) => {
    try {
      const result = await queryHandler.sendOtpLogin(message);
      if (result.err) {
        logger.log(ctx, result.err, 'Data not commit Kafka');
      } else {
        consumer.commit(true, async (err, data) => {
          if (err) {
            logger.log(ctx, err, 'Data not commit Kafka');
          }
          logger.log(ctx, data, 'Data Commit Kafka');
        });
      }
    } catch (error) {
      logger.log(ctx, error, 'Data error');
    }
  });
};

module.exports = {
  sendOtpLogin
};
