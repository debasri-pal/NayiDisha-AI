const express = require("express");

const {
  registerRecruiter,
  loginRecruiter,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerRecruiter);

router.post("/login", loginRecruiter);

module.exports = router;