const validatorGenerator = require("./validatorGenerator");
const taskSchema = require("../../../joi-schemas/task");

module.exports = validatorGenerator(taskSchema);
