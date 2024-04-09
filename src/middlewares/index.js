// Import and re-export middleware modules
const authenticator = require("./authenticator");
const errorHandler = require("./errorHandler");
const {
  loginValidator,
  registerValidator,
  taskValidator,
} = require("./validators");

module.exports = {
  authenticator,
  errorHandler,
  loginValidator,
  registerValidator,
  taskValidator,
};
