const express = require("express");
const router = express.Router();
const {
  sendMessage,
  receiveMessage,
} = require("../controller/message.controller");
// const receiveMessage = require("../controller/message.controller");
const authRoute = require("../middleware/authRoute");

router.get("/:id", authRoute, receiveMessage);
router.post("/send/:id", authRoute, sendMessage);

module.exports = router;
