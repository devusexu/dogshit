const express = require("express");

const router = express.Router();

const {
  taskController: { index, create, update, destroy },
} = require("../controllers");
const { taskValidator } = require("../middlewares");

router.get("/", index);
router.post("/", taskValidator, create);
router.put("/:id", taskValidator, update);
router.delete("/:id", destroy);

module.exports = router;
