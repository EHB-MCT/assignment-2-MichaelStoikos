import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const Visualisation = () => {
// State to store the list of skills with their view counts
const [skills, setSkills] = useState([]);

// State to store the user-specific data (total time spent, previously connected on, etc.)
const [userData, setUserData] = useState({});

  /**
 * Fetches skills data and user-specific data when the component mounts.
 * 
 * @function useEffect
 * - Fetches overall skills data (view counts) from the backend.
 * - Fetches user-specific data (e.g., total time spent, last online timestamp).
 */
  useEffect(() => {

    /**
   * Fetches all skills and their view counts from the backend.
   * 
   * @function fetchSkills
   * Updates the `skills` state with the list of skills.
   */
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

    /**
   * Fetches user-specific data (e.g., total time spent, previously connected on).
   * 
   * @function fetchUserData
   * Updates the `userData` state with the fetched data.
   */
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

    // Fetch skills and user data when the component mounts
    fetchSkills();
    fetchUserData();
  }, []);

  /**
 * Formats a given time in seconds into a human-readable format (hours, minutes, seconds).
 * 
 * @function formatTime
 * @param {number} seconds - The time in seconds to format
 * @returns {string} Formatted time string
 */
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  /**
 * Formats a given ISO date string into a human-readable format.
 * 
 * @function formatDate
 * @param {string} isoDate - The ISO date string to format
 * @returns {string} Formatted date string or "N/A" if the date is invalid
 */
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      weekday: "long", // Include the day of the week
      year: "numeric", // Include the year
      month: "long", // Include the full month name
      day: "numeric", // Include the day of the month
      hour: "numeric", // Include the hour
      minute: "numeric", // Include the minutes
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
