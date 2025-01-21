import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const [submissions, setSubmissions] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");

  // Fetch user submissions from the backend
  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/submissions");
      setSubmissions(response.data); // Set submissions in state
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // Fetch submissions when the component mounts
  useEffect(() => {
    fetchSubmissions();
  }, []); // Empty dependency array to run this only once

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">Social Media Task</div>
        <div className="nav-links">
          <button
            className={`nav-link ${
              currentView === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-link ${currentView === "form" ? "active" : ""}`}
            onClick={() => setCurrentView("form")}
          >
            Form
          </button>
        </div>
      </nav>

      {/* Conditional Rendering */}
      <div className="content">
        {currentView === "form" && (
          <UserForm fetchSubmissions={fetchSubmissions} />
        )}
        {currentView === "dashboard" && (
          <AdminDashboard submissions={submissions} />
        )}
      </div>
    </div>
  );
};

export default App;
