const Interview = require(
  "../models/Interview"
);

// SAVE Interview
const saveInterview = async (
  req,
  res
) => {
  try {
    const interview =
      await Interview.create(req.body);

    res.status(201).json(interview);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET ALL Interviews
const getInterviews = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find().sort({
        createdAt: -1,
      });

    res.json(interviews);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  saveInterview,
  getInterviews,
};