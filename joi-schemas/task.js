const Joi = require("joi");

const taskSchema = Joi.object({
  description: Joi.string().max(500).required(),

  done: Joi.boolean(),
});

module.exports = taskSchema;
