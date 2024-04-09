const validatorGenerator = require("../validatorGenerator");
const { loginSchema } = require("../../joi-schemas");

module.exports = validatorGenerator(loginSchema);
