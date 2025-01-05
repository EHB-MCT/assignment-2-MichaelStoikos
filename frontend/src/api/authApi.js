import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend base URL

/**
 * Registers a new user by sending user details to the backend.
 * 
 * @function registerUser
 * @param {Object} userData - The user's registration data
 * @param {string} userData.username - The username of the user
 * @param {string} userData.email - The email address of the user
 * @param {string} userData.password - The password of the user
 * @returns {Object} The API response indicating success or failure
 * @throws Will throw an error if the API request fails
 */
export const registerUser = async (userData) => {
  
  // Send a POST request to the /register endpoint with user data
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; // Return the API response
};

/**
 * Logs in a user by sending their credentials to the backend.
 * 
 * @function loginUser
 * @param {Object} userData - The user's login data
 * @param {string} userData.email - The email address of the user
 * @param {string} userData.password - The password of the user
 * @returns {Object} The API response containing the session token and other data
 * @throws Will throw an error if the API request fails or credentials are invalid
 */
export const loginUser = async (userData) => {

   // Send a POST request to the /login endpoint with user credentials
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data; // Return the API response
};
