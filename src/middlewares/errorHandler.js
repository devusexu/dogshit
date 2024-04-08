const { CustomError } = require('../../utils/error');

module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.isJoi) {
        return res.status(422).json({
            message: err.details[0].message
        });
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        // Handle CastError due to incorrect _id format
        return res.status(400).json({ message: 'Invalid ObejctId format' });
    }

    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
        // Duplicate email error (MongoDB unique constraint violation)
        return res.status(409).json({
            message: 'Email already exists'
        });
    }
    
    return res.status(500).json({
        message: 'Internal Server Error'
    });
};