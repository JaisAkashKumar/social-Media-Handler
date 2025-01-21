const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize app
dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Handle large JSON payloads
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// MongoDB Connection
const CONNECTION_URL =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
const submissionsRoutes = require("./routes/submissions"); // Import your routes
app.use("/api/submissions", submissionsRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Social Media Task Backend!");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
