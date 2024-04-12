// Import and re-export middleware modules
const isAuthenticated = require("./authenticator");
const errorHandler = require("./errorHandler");
const { limiter, loginLimiter } = require("./rateLimiter");
const {
  loginValidator,
  registerValidator,
  taskValidator,
} = require("./validators");

module.exports = {
  isAuthenticated,
  errorHandler,
  limiter,
  loginLimiter,
  loginValidator,
  registerValidator,
  taskValidator,
};
