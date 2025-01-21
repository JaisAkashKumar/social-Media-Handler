const express = require("express");
const router = express.Router();
const UserSubmission = require("../models/UserSubmission");

// Create a submission
router.post("/", async (req, res) => {
  try {
    const { name, socialMediaHandle, images } = req.body;
    const newSubmission = await UserSubmission.create({
      name,
      socialMediaHandle,
      images,
    });
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await UserSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
