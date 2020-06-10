const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../../helpers/utils/wrapper');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if(!validate.isEmpty(error)){
    let message = error.details[0].message;
    return wrapper.error('fail', message, 400);
  }
  return wrapper.data(value, 'success', 200);

};

module.exports = {
  isValidPayload
};
