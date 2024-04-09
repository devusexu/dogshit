const express = require("express");

const router = express.Router();

const { register, login, index } = require("../controllers/auth");
const registerValidator = require("../middlewares/validator/registerValidator");
const loginValidator = require("../middlewares/validator/loginValidator");

router.post("/", registerValidator, register);
router.post("/login", loginValidator, login);

// return all users - used for development
router.get("/", index);

module.exports = router;
