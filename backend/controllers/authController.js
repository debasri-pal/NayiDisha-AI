const Recruiter = require("../models/Recruiter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerRecruiter = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingRecruiter = await Recruiter.findOne({
      email,
    });

    if (existingRecruiter) {
      return res
        .status(400)
        .json({ message: "Recruiter already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const recruiter = await Recruiter.create({
      name,
      email,
      password: hashedPassword,
    });

res.status(201).json({
  message: "Recruiter registered successfully",
  recruiter: {
    id: recruiter._id,
    name: recruiter.name,
    email: recruiter.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({
      email,
    });

    if (!recruiter) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(
      password,
      recruiter.password
    );

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: recruiter._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

res.json({
  token,
  recruiter: {
    id: recruiter._id,
    name: recruiter.name,
    email: recruiter.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerRecruiter,
  loginRecruiter,
};