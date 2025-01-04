import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const Visualisation = () => {
  const [skills, setSkills] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/skills", {
          headers: { Authorization: localStorage.getItem("sessionToken") },
        });
        setSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user-data", {
          headers: { Authorization: localStorage.getItem("sessionToken") },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSkills();
    fetchUserData();
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div>
      <Nav />
      <div className="visualisation-container">
        <h2>Data Visualisation</h2>

        <div className="user-data">
          <h3>Your Data</h3>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Total Time Spent:</strong> {formatTime(userData.totalTimeSpentInSeconds)}</p>
          <p><strong>Last Online:</strong> {formatDate(userData.PreviouslyConnectedOn)}</p>
        </div>

        <div className="overall-data">
          <h3>Overall Skills View Counts</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>View Count</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Visualisation;
