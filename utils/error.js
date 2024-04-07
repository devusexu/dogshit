class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500; // Default to Internal Server Error
    }
}

// 400
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    };
}

// 401
class AuthenticationError extends CustomError {
    constructor(message) {
        super(message, 401);
    };
}

// 404
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    };
}

// 409
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    };;
}

module.exports = { CustomError, BadRequestError, AuthenticationError, NotFoundError, ConflictError };