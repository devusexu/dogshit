const jwt = require('jsonwebtoken');
const { BadRequestError, AuthenticationError } = require('../../utils/error');

function isAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];

        if (!token) throw new BadRequestError('Token should be included in the authorization header');

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) throw new AuthenticationError('Authentication falied');

            req.user = user;

            next();
        })
    } catch (error) {
        next(error);
    }
}

module.exports = isAuthenticated;