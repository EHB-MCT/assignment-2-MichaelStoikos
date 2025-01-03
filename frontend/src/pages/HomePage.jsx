import {Link} from "react-router-dom"
import Nav from "../components/Nav"
import Skills from "../components/SkillsComponent"
import axios from "axios";
import React, { useEffect } from "react";

const homePage = () => {

    useEffect(() => {
        const handleUnload = async () => {
          const sessionToken = localStorage.getItem("sessionToken");
          if (!sessionToken) {
            console.error("No session token found");
            return;
          }
    
          try {
            // Send a request to the backend to finalize the session
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
    
        // Add beforeunload listener
        window.addEventListener("beforeunload", handleUnload);
    
        // Cleanup the event listener when component unmounts
        return () => window.removeEventListener("beforeunload", handleUnload);
      }, []);

    return (
        <div className="homeContainer">
            <Nav/>
            <Skills></Skills>
            <div className="welcomeFlex">
                <h1>Welkom op mijn website</h1>
                <div>
                    <h3>Ben jij actief in de multimediasector en op zoek naar een plek waar talenten samenkomen? Dan ben je hier op de juiste plek! Bij GatherData kun je eenvoudig vaardigheden uitwisselen met andere professionals.</h3>

                    <p>💡 Hoe werkt het?</p>
                    Heb jij een webdeveloper nodig voor jouw project? Of zoek je een designer om jouw visie tot leven te brengen? Plaats een verzoek of reageer op een ander ticket, en ruil jouw expertise voor die van iemand anders. Samen bereiken we meer!

                    <p>🔍 Wat kun je hier vinden?</p>

                    Een breed scala aan vaardigheden en creatieve professionals.
                    Een plek om jouw talenten te tonen én te versterken.
                    Een community die samenwerking en innovatie stimuleert.
                    Maak snel een account aan, ontdek de mogelijkheden, en start vandaag nog met het uitwisselen van skills!

                    <p>Veel succes en plezier,</p>
                </div>
            </div>
            
        </div>
    );
}

export default homePage