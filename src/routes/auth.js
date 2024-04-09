const express = require("express");

const router = express.Router();

const {
  authController: { register, login, index },
} = require("../controllers");
const { registerValidator, loginValidator } = require("../middlewares");

router.post("/", registerValidator, register);
router.post("/login", loginValidator, login);

// return all users - used for development
router.get("/", index);

module.exports = router;
