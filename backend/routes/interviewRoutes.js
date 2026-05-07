const express = require("express");

const router = express.Router();

const {
  saveInterview,
  getInterviews,
} = require(
  "../controllers/interviewController"
);

// SAVE Interview
router.post("/", saveInterview);

// GET All Interviews
router.get("/", getInterviews);

module.exports = router;