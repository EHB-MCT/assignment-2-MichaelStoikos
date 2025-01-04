import React from "react";
import Nav from "../components/Nav";

const jobs = [
  { id: 1, skill: "Web Development", description: "Build a responsive website for a local business." },
  { id: 2, skill: "Graphic Design", description: "Create a new logo and branding materials for a startup." },
  { id: 3, skill: "Backend Development", description: "Set up a secure REST API for a mobile application." },
  { id: 4, skill: "UI/UX Design", description: "Design wireframes and prototypes for an e-commerce app." },
];

const Jobs = () => {
  return (
    <div>
      <Nav />
      <div className="jobs-container">
        <h2>Available Jobs</h2>
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.skill}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
