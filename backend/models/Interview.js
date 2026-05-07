const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },

    responses: [
      {
        question: String,
        answer: String,
      },
    ],

    score: Number,

    confidenceLevel: String,

    classification: String,

    fraudDetected: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);