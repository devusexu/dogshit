const taskSchema = require('../utils/joi-schema/task');
// haven't refactor validation for user's login and register

function validatorGenerator(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            next(error);
        }
        req.validatedData = value;
        next();
    }
}

const taskValidator = validatorGenerator(taskSchema);

module.exports = { taskValidator, };