const express = require("express");

const router = express.Router();

const { index, create, update, destroy } = require("../controllers/task");
const taskValidator = require("../middlewares/validator/taskValidator");

router.get("/", index);
router.post("/", taskValidator, create);
router.put("/:id", taskValidator, update);
router.delete("/:id", destroy);

module.exports = router;
