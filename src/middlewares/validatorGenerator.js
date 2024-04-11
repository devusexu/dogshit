const { escape, normalizeEmail } = require("validator");

function validatorGenerator(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    if (value.description) {
      value.description = escape(value.description);
    }

    if (value.email) {
      value.email = normalizeEmail(value.email);
    }

    req.validatedData = value;
    return next();
  };
}

module.exports = validatorGenerator;
