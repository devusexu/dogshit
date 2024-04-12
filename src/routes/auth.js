const express = require("express");
const {
  loginLimiter,
  registerValidator,
  loginValidator,
} = require("../middlewares");

const {
  authController: { register, login, index },
} = require("../controllers");

const router = express.Router();

router.post("/", registerValidator, register);
router.post("/login", loginLimiter, loginValidator, login);

// return all users - used for development
router.get("/", index);

module.exports = router;
