
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const sendOtpLogin = async (data) => {
  const getData = async () => {
    const result = await user.sendOtpLogin(data);
    return result;
  };
  const result = await getData();
  return result;
};

const checkUserById = async (data) => {
  const getData = async () => {
    const result = await user.checkUserById(data);
    return result;
  };
  const result = await getData();
  return result;
};


module.exports = {
  sendOtpLogin,
  checkUserById
};
