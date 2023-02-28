const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return { error: error.details[0].message };
  }

  return { error: null };
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return { error: error.details[0].message };
  }

  return { error: null };
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
