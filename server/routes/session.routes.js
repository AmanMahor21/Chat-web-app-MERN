const express = require("express");
const router = express.Router();
const authRoute = require("../middleware/authRoute");

router.get("/", authRoute, (req, res) => {
  console.log("working");
  res.status(200).json({ message: "Session is valid" });
});

module.exports = router;
