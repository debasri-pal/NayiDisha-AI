const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

// ADD THIS
const interviewRoutes = require(
  "./routes/interviewRoutes"
);

dotenv.config({ path: "../.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// ADD THIS
app.use(
  "/api/interviews",
  interviewRoutes
);

app.get("/", (req, res) => {
  res.send("NayiDisha Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});