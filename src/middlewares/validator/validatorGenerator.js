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

module.exports = validatorGenerator;