import axios from "axios";

const API_URL = "http://localhost:5000/Skills";

export const fetchSkills = async () => {
  try {
    const sessionToken = localStorage.getItem("sessionToken"); // Retrieve session token

    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: sessionToken, // Add the session token to the headers
      },
    });

    return response.data.data; // Return the skills data
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

export const incrementSkillClick = async (skillId) => {
  try {
    const sessionToken = localStorage.getItem("sessionToken"); // Retrieve the session token

    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

    const response = await axios.post(
      `${API_URL}/${skillId}/click`, // Endpoint to increment the click count
      {}, // Empty body
      {
        headers: {
          Authorization: sessionToken, // Add the session token to the headers
        },
      }
    );

    return response.data; // Return success message
  } catch (error) {
    console.error("Error incrementing skill click:", error);
    throw error;
  }
};
