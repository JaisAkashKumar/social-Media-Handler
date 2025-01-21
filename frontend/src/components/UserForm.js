import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ fetchSubmissions }) => {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
    images: [], // Base64 encoded images
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads and convert to Base64
  const handleFileUpload = (e) => {
    const files = e.target.files;
    const fileArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        fileArray.push(reader.result);
        if (fileArray.length === files.length) {
          setFormData((prevState) => ({
            ...prevState,
            images: fileArray,
          }));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST the form data to the backend
      await axios.post("http://localhost:5000/api/submissions", formData);
      alert("Submission successful!");
      fetchSubmissions(); // Refresh the admin dashboard with new submissions

      // Reset form data
      setFormData({
        name: "",
        socialMediaHandle: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input
          type="text"
          name="socialMediaHandle"
          value={formData.socialMediaHandle}
          onChange={handleInputChange}
          placeholder="Enter your social media handle"
          required
        />
      </div>
      <div>
        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
