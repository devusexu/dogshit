const validatorGenerator = require("./validatorGenerator");
const { loginSchema } = require("../../../joi-schemas/user");

module.exports = validatorGenerator(loginSchema);
