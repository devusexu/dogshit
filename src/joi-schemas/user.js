const Joi = require("joi");

const baseRule = {
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  email: Joi.string().email().required(),
};

const usernameRule = Joi.string().min(3).max(30).required();

const registerSchema = Joi.object({
  ...baseRule,
  username: usernameRule,
});

const loginSchema = Joi.object({
  ...baseRule,
});

module.exports = { registerSchema, loginSchema };
