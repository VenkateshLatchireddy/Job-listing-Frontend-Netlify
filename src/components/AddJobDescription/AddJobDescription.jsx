import React, { useState } from "react";
import "./AddJobDescription.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate at the top
import JobListingimg from "../../../src/assets/job-listing2.jpg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;




const skillsList = [
  "HTML", "CSS", "React.js", "JavaScript", "Node.js", "MySQL", "Express.js",
  "REST APIs", "Figma", "Adobe XD", "Wireframing", "Prototyping", "MongoDB",
  "TypeScript", "Redux", "GraphQL", "Bootstrap", "Tailwind CSS", "Material UI",
  "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Firebase", "PostgreSQL",
  "Jest", "Cypress", "CI/CD", "WebSockets", "Next.js", "Flutter", "React Native",
  "Android Development", "iOS Development", "UI/UX Design", "Agile Methodology",
  "Scrum", "JIRA", "Trello", "Web Performance Optimization", "SEO", "Linux",
  "Python", "Django", "Flask", "PHP", "Laravel", "C++", "C#", ".NET", "Java",
  "Spring Boot", "Go", "Rust", "Cybersecurity", "Penetration Testing",
  "Blockchain", "Solidity", "Machine Learning", "Data Science", "TensorFlow",
  "PyTorch", "NLP", "Big Data", "Hadoop", "Power BI", "Tableau"
];

const AddJobDescription = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    remote_office: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: [],
    additionalInfo: "",
    hiringCount: "",
  });
  const [error, setError] = useState(""); // for error handling
  const handleSelectSkill = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous error messages

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
        window.alert("Authentication error. Please log in again.");
        return;
    }

    const jobData = {
        companyName: formData.companyName,
        companyLogo: formData.companyLogo,
        jobPosition: formData.jobPosition,
        monthlySalary: formData.monthlySalary,
        jobType: formData.jobType,
        remote_office: formData.remote_office,
        location: formData.location,
        jobDescription: formData.jobDescription,
        aboutCompany: formData.aboutCompany,
        skillsRequired: Array.isArray(selectedSkills) ? selectedSkills.join(', ') : selectedSkills,
        additionalInfo: formData.additionalInfo,
        hiringCount: formData.hiringCount,
        userId: userId || "",
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(jobData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Job added successfully!", data);
            window.alert("Job added successfully!");
            navigate("/");  // Redirect to Home Page
        } else {
            const errorMessage = data.message || "Please fill the form with correct data.";
            window.alert(errorMessage);  // Show error in an alert
            console.log("Response Data:", data);
            console.log("Response Status:", response.status);
        }
    } catch (err) {
        window.alert("Server error. Please try again.");  // Alert for server error
        console.error("Error:", err);
    }
};


  const handleCancel = () => {
    navigate(-1);  // Go back to the previous page
};

  return (
    <div className="add-job-description">
      <div className="form-container">
        <h2 className="form-heading">Add Job Description</h2>
        <form className="job-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Enter Company Name"
              className="form-input"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Company Logo URL</label>
            <input
              type="text"
              name="companyLogo"
              placeholder="Enter Logo URL"
              className="form-input"
              value={formData.companyLogo}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Job Position</label>
            <input
              type="text"
              name="jobPosition"
              placeholder="Enter Job Position"
              className="form-input"
              value={formData.jobPosition}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Monthly Salary</label>
            <input
              type="number"
              name="monthlySalary"
              placeholder="Enter Salary"
              className="form-input"
              value={formData.monthlySalary}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Job Type</label>
            <select
              name="jobType"
              className="form-input"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="" disabled>Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contractual">Contractual</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Remote/Office</label>
            <select
              name="remote_office"
              className="form-input"
              value={formData.remote_office}
              onChange={handleChange}
            >
              <option value="" disabled>Select</option>
              <option value="remote">Remote</option>
              <option value="office">Office</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Job Description</label>
            <textarea
              name="jobDescription"
              placeholder="Enter Job Description"
              className="form-textarea"
              value={formData.jobDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <label className="form-label">About Company</label>
            <textarea
              name="aboutCompany"
              placeholder="Type about your company"
              className="form-textarea"
              value={formData.aboutCompany}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <label className="form-label">Skills Required</label>
            <div className="form-row-skills">
              <select
                className="form-input"
                onChange={handleSelectSkill}
                defaultValue=""
              >
                <option value="" disabled>Select skills</option>
                {skillsList.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              {/* Display selected skills below the dropdown */}
              <div className="selected-skills">
                {selectedSkills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      className="remove-skill"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Additional Information</label>
            <input
              type="text"
              name="additionalInfo"
              placeholder="Enter additional information"
              className="form-input"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Hiring Count</label>
            <select
              name="hiringCount"
              className="form-input"
              value={formData.hiringCount}
              onChange={handleChange}
            >
              <option value="" disabled>Select Hiring Count</option>
              <option value="1-5">1-5</option>
              <option value="6-10">6-10</option>
              <option value="11-20">11-20</option>
              <option value="21-50">21-50</option>
              <option value="51-100">51-100</option>
              <option value="100+">100+</option>
            </select>
          </div>
          <div className="btn-container">
                <div className="form-buttons">
                    <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn-add-job">+ Add Job</button>
                </div>
            </div>
        </form>
      </div>

      <div className="image-container">
        <img src={JobListingimg} alt="Job Illustration" className="job-image" />
      </div>
    </div>
  );
};

export default AddJobDescription;
