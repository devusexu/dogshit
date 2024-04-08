const validatorGenerator = require('./validatorGenerator');
const { registerSchema } = require('../../../joi-schemas/user');

module.exports = validatorGenerator(registerSchema);