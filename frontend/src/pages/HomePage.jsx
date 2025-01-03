import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Skills from "../components/SkillsComponent";

const HomePage = () => {
  const [previouslyConnectedOn, setPreviouslyConnectedOn] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const sessionToken = localStorage.getItem("sessionToken");
      if (!sessionToken) {
        console.error("No session token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: sessionToken },
        });
        setPreviouslyConnectedOn(response.data.PreviouslyConnectedOn);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();

    const handleUnload = async () => {
      const sessionToken = localStorage.getItem("sessionToken");
      if (!sessionToken) {
        console.error("No session token found");
        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/logout",
          {},
          { headers: { Authorization: sessionToken } }
        );
        console.log("Session finalized and time updated in the database");
      } catch (error) {
        console.error("Failed to finalize session:", error);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "No previous connection";
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
    <div className="homeContainer">
      <Nav />
      <Skills />
      <div className="welcomeFlex">
        <h1>Welkom op mijn website</h1>
        <p>
          Previously connected on: <strong>{formatDate(previouslyConnectedOn)}</strong>
        </p>
        <div>
          <h3>
            Ben jij actief in de multimediasector en op zoek naar een plek waar talenten samenkomen? Dan ben je hier op de juiste plek! Bij GatherData kun je eenvoudig vaardigheden uitwisselen met andere professionals.
          </h3>
          <p>💡 Hoe werkt het?</p>
          Heb jij een webdeveloper nodig voor jouw project? Of zoek je een designer om jouw visie tot leven te brengen? Plaats een verzoek of reageer op een ander ticket, en ruil jouw expertise voor die van iemand anders. Samen bereiken we meer!
          <p>🔍 Wat kun je hier vinden?</p>
          Een breed scala aan vaardigheden en creatieve professionals. Een plek om jouw talenten te tonen én te versterken. Een community die samenwerking en innovatie stimuleert. Maak snel een account aan, ontdek de mogelijkheden, en start vandaag nog met het uitwisselen van skills!
          <p>Veel succes en plezier,</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
