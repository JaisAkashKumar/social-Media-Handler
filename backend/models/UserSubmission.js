const mongoose = require("mongoose");

const userSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMediaHandle: { type: String, required: true },
  images: { type: [String], required: true }, // Store URLs of uploaded images
});

const UserSubmission = mongoose.model("UserSubmission", userSubmissionSchema);
module.exports = UserSubmission;
