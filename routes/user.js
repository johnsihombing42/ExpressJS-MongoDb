const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.put("/:id", controller.user.update);
router.delete("/:id", controller.user.delete);
module.exports = router;
