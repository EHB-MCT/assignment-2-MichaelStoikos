import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Skills from "../components/SkillComponent";

const HomePage = () => {
  // State to store the previously connected timestamp of the user
  const [previouslyConnectedOn, setPreviouslyConnectedOn] = useState("");

  /**
 * Fetches user-specific data, including the "PreviouslyConnectedOn" timestamp,
 * when the component mounts.
 * 
 * @function useEffect
 * - Retrieves the session token from local storage to authenticate the request.
 * - Calls the `/user` API endpoint to fetch user data.
 * - Updates the state with the "PreviouslyConnectedOn" value if available.
 * - Adds an event listener to handle session finalization when the user unloads the page.
 * 
 * @returns {void}
 */
  useEffect(() => {
    const fetchUserData = async () => {
      const sessionToken = localStorage.getItem("sessionToken");
      if (!sessionToken) {
        console.error("No session token found");
        return; // Exit if no session token is found
      }

      try {
        // Fetch user data from the backend
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: sessionToken }, // Pass the session token in headers
        });
        // Update the state with the "PreviouslyConnectedOn" timestamp
        setPreviouslyConnectedOn(response.data.PreviouslyConnectedOn);
      } catch (error) {
        console.error("Failed to fetch user data:", error); // Log any errors encountered
      }
    };

    // Fetch user data when the component mounts
    fetchUserData();

    /**
   * Handles session finalization when the user unloads the page.
   * 
   * @function handleUnload
   * Sends a `POST` request to the `/logout` endpoint to finalize the session and
   * update the database with the total time spent on the website.
   */
    const handleUnload = async () => {
      const sessionToken = localStorage.getItem("sessionToken");
      if (!sessionToken) {
        console.error("No session token found");
        return; // Exit if no session token is found
      }

      try {
         // Finalize the session by calling the logout endpoint
        await axios.post(
          "http://localhost:5000/logout",
          {}, // No body content required
          { headers: { Authorization: sessionToken } } // Pass the session token in headers
        );
        console.log("Session finalized and time updated in the database");
      } catch (error) {
        console.error("Failed to finalize session:", error); // Log any errors encountered
      }
    };

    // Add an event listener for the "beforeunload" event to handle session finalization
    window.addEventListener("beforeunload", handleUnload);

    // Cleanup: Remove the event listener when the component unmounts
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  /**
 * Formats a given ISO date string into a user-friendly format.
 * 
 * @function formatDate
 * @param {string} isoDate - The ISO date string to format
 * @returns {string} A formatted date string or a fallback message if the date is invalid
 */
  const formatDate = (isoDate) => {
    if (!isoDate) return "No previous connection";
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
      <Skills />
      
      <main className="main-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welkom op mijn website</h1>
          <p className="welcome-subtitle">
            Ben jij actief in de multimediasector en op zoek naar een plek waar talenten samenkomen? 
            Dan ben je hier op de juiste plek! Bij GatherData kun je eenvoudig vaardigheden uitwisselen 
            met andere professionals.
          </p>
        </div>

        <div className="welcomeFlex">
          <div>
          <p>💡 Hoe werkt het?</p>
          Heb jij een webdeveloper nodig voor jouw project? Of zoek je een designer om jouw visie tot leven te brengen? Plaats een verzoek of reageer op een ander ticket, en ruil jouw expertise voor die van iemand anders. Samen bereiken we meer!
          <p>🔍 Wat kun je hier vinden?</p>
          Een breed scala aan vaardigheden en creatieve professionals. Een plek om jouw talenten te tonen én te versterken. Een community die samenwerking en innovatie stimuleert. Maak snel een account aan, ontdek de mogelijkheden, en start vandaag nog met het uitwisselen van skills!
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>Veel succes en plezier!</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
