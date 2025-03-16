import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Clock, MapPin,} from "lucide-react";
import "./JobDetails.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const SkillBadge = ({ skill }) => <span className="jobdetails-skill-badge">{skill}</span>;

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // 🔹 Get logged-in user ID from local storage
    const userId = localStorage.getItem("userId");
    setCurrentUserId(userId);

    // 🔹 Fetch job details
    axios.get(`${API_BASE_URL}/api/jobs/${id}`)
      .then((response) => {
        console.log(response.data);  // Log to check the response
        setJob(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setLoading(false);
      });
}, [id]);


  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  // 🔹 Check if logged-in user is the job owner
  const isOwner = currentUserId && currentUserId === job.userId;


  return (
                <div className="jobdetails-wrapper">
                  <div className="jobdetails-container">
                    <div className="jobdetails-card">
                    <div className="jobdetails-header">
              <div className="jobdetails-content">
                <div className="jobdetails-meta">
                  <Clock className="jobdetails-icon" />
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  <span className="jobdetails-separator">•</span>
                  <span>{job.jobType}</span>
                </div>
                <h1 className="jobdetails-title">{job.jobPosition}</h1>
                <div className="jobdetails-location">
                  <MapPin className="jobdetails-icon" />
                  <span>{job.location}</span>
                </div>
              </div>
  
              {isOwner && (
                <button className="btn-edit-">
                  Edit Job
                </button>
              )}
            </div>
            <div className="jobdetails-section">
            <div className="jobdetails-grid">
              <div className="jobdetails-detail">
                <p className="jobdetails-detail-label">Monthly Salary:</p>
                <p className="jobdetails-detail-text">₹{job.monthlySalary}</p>
              </div>
              <div className="jobdetails-detail">
                <p className="jobdetails-detail-label">Duration:</p>
                <p className="jobdetails-detail-text">6 Months</p>
              </div>
            </div>
          </div>

          <div className="company-info">
            <h2>About the company</h2>
            <p>{job.aboutCompany}</p>
          </div>

          <div className="jobdetails-description">
            <h2>About the job/internship</h2>
            <p>{job.jobDescription}</p>
            <h3>Responsibilities:</h3>
            <ul className="jobdetails-list">
              <li>Work on the development of theme customization</li>
              <li>Implement system integrations</li>
              <li>Contribute to the development of HTML5/CSS/JavaScript</li>
              <li>Optimize for mobile-friendly websites</li>
            </ul>
          </div>

          <div className="skills-required">
            <h2>Skills Required</h2>
            <div className="jobdetails-skills-container">
              {job.skillsRequired.split(",").map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>

          <div className="additional-info">
            <h2>Additional Information</h2>
            <p>{job.additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
