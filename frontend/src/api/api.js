import axios from "axios";

const API_URL = "http://localhost:5000/Skills";

export const fetchSkills = async () => {
  try {
    const sessionToken = localStorage.getItem("sessionToken"); 

    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: sessionToken, 
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

export const incrementSkillClick = async (skillId) => {
  try {
    const sessionToken = localStorage.getItem("sessionToken"); 

    if (!sessionToken) {
      throw new Error("No session token found. Please log in.");
    }

    const response = await axios.post(
      `${API_URL}/${skillId}/click`, 
      {},
      {
        headers: {
          Authorization: sessionToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error incrementing skill click:", error);
    throw error;
  }
};
