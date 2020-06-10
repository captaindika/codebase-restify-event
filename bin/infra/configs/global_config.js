require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  kafka: {
    kafkaHost: process.env.KAFKA_HOST_URL
  },
  redisHost: process.env.REDIS_CLIENT_HOST,
  redisPort: process.env.REDIS_CLIENT_PORT,
  redisPassword: process.env.REDIS_CLIENT_PASSWORD,
  redisIndex: process.env.REDIS_INDEX,
  email: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
