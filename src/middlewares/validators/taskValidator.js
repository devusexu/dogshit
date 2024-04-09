const validatorGenerator = require("../validatorGenerator");
const { taskSchema } = require("../../joi-schemas");

module.exports = validatorGenerator(taskSchema);
