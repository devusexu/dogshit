const validatorGenerator = require("../validatorGenerator");
const { registerSchema } = require("../../joi-schemas");

module.exports = validatorGenerator(registerSchema);
