import {Link} from "react-router-dom"
import Nav from "../components/Nav"
import Skills from "../components/SkillsComponent"

const homePage = () => {

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