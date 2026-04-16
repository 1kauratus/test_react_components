const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// ✅ FIXED CORS (important)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });

// Model
const Feature = require("./schema");

// Test route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// GET features
app.get("/features", async (req, res) => {
  try {
    const data = await Feature.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch features" });
  }
});

// POST feature
app.post("/features", async (req, res) => {
  try {
    const feature = new Feature(req.body);
    await feature.save();
    res.json({ message: "Feature saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save feature" });
  }
});

// Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));