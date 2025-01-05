import React, { useEffect, useState } from "react";
import { fetchSkills, incrementSkillClick } from "../api/api";
import { Link, useNavigate } from "react-router-dom"

const SkillList = () => {
 // State to hold the list of skills fetched from the server
const [skills, setSkills] = useState([]);

// State to indicate whether data is currently being loaded
const [loading, setLoading] = useState(true);

// State to hold any error messages during the fetch or operations
const [error, setError] = useState("");

// Hook to navigate to different routes
const navigate = useNavigate();

  /**
 * Fetches the list of skills from the backend when the component loads.
 * 
 * @function useEffect
 * Calls the `fetchSkills` API function and updates the skills state.
 * Handles loading, error states, and unauthorized access (401).
 */
  useEffect(() => {
    const getSkills = async () => {
      try {
        // Fetch skills data from the backend
      const data = await fetchSkills();

      // Update the skills state with fetched data
      setSkills(data);

      // Set loading to false after successfully fetching data
      setLoading(false);
    } catch (error) {
      // Handle errors during fetching
      setError("Error fetching skills");
      setLoading(false);

      // Redirect to login page if unauthorized (401)
      if (error.response?.status === 401) {
        navigate("/");
        }
      }
    };

    getSkills(); // Call the fetch function
  }, [navigate]); // Re-run the effect if `navigate` changes

  /**
 * Handles click events on a specific skill to increment its view count.
 * 
 * @function handleSkillClick
 * @param {number} skillId - The ID of the skill that was clicked
 * Calls the `incrementSkillClick` API function to increment the view count.
 * Updates the local skills state to reflect the new view count.
 */
  const handleSkillClick = async (skillId) => {
    try {
      // Increment the view count for the specified skill in the backend
      await incrementSkillClick(skillId);

      // Update the local skills state to reflect the new view count
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? { ...skill, views: skill.views + 1 } // Increment views for the clicked skill
            : skill
        )
      );
    } catch (error) {
      // Log any errors encountered during the operation
      console.error("Failed to increment skill click:", error);
    }
  };

  /**
  * Renders a loading message while data is being fetched.
  * If there's an error, displays the error message.
  */
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="skills-container">
      <div className="skills-list">
        {skills.map((skill) => (
          <Link to="/jobs"><button
            key={skill.id}
            className="skill-button"
            onClick={() => handleSkillClick(skill.id)}
          >
            {skill.name}
          </button></Link>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
