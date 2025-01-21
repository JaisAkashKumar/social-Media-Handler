import React, { useState, useEffect } from "react";

const AdminDashboard = ({ submissions }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="AdminDashboard">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <div>
          <div className="loader"></div>
          <span
            className="w-full mx-auto"
            style={{ textAlign: "center", display: "block" }}
          >
            Loading...
          </span>
        </div>
      ) : submissions.length > 0 ? (
        submissions.map((submission, index) => (
          <div className="submission" key={index}>
            <h3>{submission.name}</h3>
            <p>
              <strong>Social Media Handle:</strong>{" "}
              <a
                href={`${submission.socialMediaHandle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {submission.socialMediaHandle}
              </a>
            </p>
            <div className="images-container">
              {submission.images.map((image, idx) => (
                <img key={idx} src={image} alt={`Uploaded ${idx}`} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="empty-state">No submissions yet!</p>
      )}
    </div>
  );
};

export default AdminDashboard;
