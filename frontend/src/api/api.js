import axios from "axios";

// Base API URL for skills-related operations
const API_URL = "http://localhost:5000/Skills";

/**
 * Fetches all skills and their respective view counts.
 * 
 * @function fetchSkills
 * @returns {Array} Array of skills with view counts
 * @throws Will throw an error if no session token is found or the API request fails
 */
export const fetchSkills = async () => {
  try {
    // Retrieve the session token from local storage
    const sessionToken = localStorage.getItem("sessionToken"); 

    // If the session token is not found, throw an error
    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

     // Send GET request to fetch skills
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: sessionToken, // Pass the session token as an authorization header
      },
    });

    return response.data.data; // Return the array of skills from the response
  } catch (error) {
    console.error("Error fetching skills:", error); // Log any errors for debugging
    throw error;// Rethrow the error to handle it in the calling function
  }
};

/**
 * Increments the click/view count for a specific skill.
 * 
 * @function incrementSkillClick
 * @param {number} skillId - The ID of the skill to increment the view count
 * @returns {Object} The API response indicating success
 * @throws Will throw an error if no session token is found or the API request fails
 */
export const incrementSkillClick = async (skillId) => {
  try {
    // Retrieve the session token from local storage
    const sessionToken = localStorage.getItem("sessionToken"); 

    // If the session token is not found, throw an error
    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

    // Send POST request to increment the view count for the specified skill
    const response = await axios.post(
      `${API_URL}/${skillId}/click`, // Append the skill ID and "click" action to the URL
      {},
      {
        headers: {
          Authorization: sessionToken, // Pass the session token as an authorization header
        },
      }
    );

    return response.data; // Return the API response
  } catch (error) {
    console.error("Error incrementing skill click:", error); // Log any errors for debugging
    throw error; // Rethrow the error to handle it in the calling function
  }
};
