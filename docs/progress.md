# Progress.md

## **Inleiding**
Dit project heeft als doel een webapplicatie te ontwikkelen waar professionals in de multimediasector vaardigheden kunnen uitwisselen. Denk hierbij aan een platform waar een webdeveloper en een grafisch ontwerper elkaars expertise kunnen inzetten zonder gebruik te maken van financiële middelen. Dit is een soort alternatief voor platforms zoals Fiverr, maar dan zonder monetisatie.

Om dit platform succesvol te maken, is het essentieel om inzicht te krijgen in het gedrag en de interacties van de gebruikers. Hiervoor track ik bepaalde data, zoals welke vaardigheden het meest worden bekeken, hoeveel tijd gebruikers op de website doorbrengen en welke tickets (jobs) populair zijn.

---

## **Argumentatie: Waarom track ik deze data?**
Om het platform te optimaliseren en gebruiksvriendelijk te maken, track ik de volgende gegevens:

1. **Vaardigheden en hun populariteit (views):**
   - Door te tracken hoe vaak een vaardigheid wordt bekeken, kan ik bepalen welke vaardigheden het meest gevraagd zijn.
   - Deze inzichten helpen bij het optimaliseren van de interface en het aanbieden van populaire vaardigheden.

2. **Gebruikersactiviteit (sessietijd):**
   - Door te meten hoeveel tijd een gebruiker op de website doorbrengt, krijg ik inzicht in de betrokkenheid en de gebruiksvriendelijkheid van de applicatie.
   - Als de tijd laag is, kan dit betekenen dat de website niet intuïtief genoeg is of dat er technische problemen zijn.

3. **Interacties met jobs (clicks):**
   - Door te registreren hoe vaak jobs worden bekeken en geselecteerd, kan ik beter begrijpen welke soorten jobs gebruikers aantrekkelijk vinden.
   - Dit helpt ook bij het aanbieden van relevante suggesties en aanbevelingen.

4. **Gebruikersgeschiedenis:**
   - De laatste keer dat een gebruiker was ingelogd (`PreviouslyConnectedOn`) en het totaal aantal minuten dat zij hebben doorgebracht op de website, biedt waardevolle inzichten over gebruikersbetrokkenheid.

Deze data stelt me in staat om mijn platform continu te verbeteren en aan te passen aan de behoeften van de gebruikers.

---

## **Progress**

### **1. Begin van het project: brainstormen en conceptontwikkeling**
- De initiële brainstormfase richtte zich op het doel van de applicatie:
  - Het bouwen van een "vaardigheidsuitwisselingsplatform".
  - Het tracken van relevante gegevens om de applicatie te verbeteren.
- Het definiëren van de belangrijkste data:
  - Welke vaardigheden zijn populair (views).
  - Gebruikerssessietijd (tijd online).
  - Gebruikersinteracties met jobs (aantal clicks).

---

### **2. Technologische keuzes**
- **Frontend**: ReactJS werd gekozen vanwege de component-gebaseerde structuur en flexibiliteit.
- **Backend**: NodeJS met ExpressJS werd gekozen vanwege de snelle setup en ondersteuning voor RESTful API's.
- **Database**: MongoDB, een NoSQL-database, werd gekozen vanwege de flexibiliteit en schaalbaarheid voor het opslaan van gebruikers- en vaardigheidsdata.

---

### **3. Voortgang in detail**

#### **a. Basisopzet van de applicatie**
- Backend opgezet met NodeJS en verbinding gemaakt met MongoDB.
- Frontend opgezet met ReactJS en routing toegevoegd met React Router.
- Een eerste verbinding tussen frontend en backend gerealiseerd.

#### **b. Registratie en login-systeem**
- Functie geïmplementeerd om gebruikers te registreren:
  - Wachtwoorden worden gehashed met BcryptJS voor beveiliging.
  - Gegevens zoals gebruikersnaam, e-mail en wachtwoord worden opgeslagen in MongoDB.
- Login-systeem gebouwd:
  - Een sessietoken wordt gegenereerd met UUID en opgeslagen in de database.
  - Het token wordt gebruikt om gebruikers te authenticeren bij andere API-aanroepen.

#### **c. Tracking van data**
- **Tracking van vaardigheid-views**:
  - Een API gemaakt om het aantal views per vaardigheid bij te houden.
  - Elke keer dat een gebruiker een vaardigheid selecteert, wordt de viewcount verhoogd.
- **Tracking van sessietijd**:
  - Bij login wordt de starttijd opgeslagen.
  - Bij het verlaten van de pagina (via een `beforeunload` event) wordt de totale sessietijd berekend en opgeslagen in de database.
- **Tracking van gebruikersgeschiedenis**:
  - Het veld `PreviouslyConnectedOn` houdt bij wanneer de gebruiker voor het laatst was ingelogd.

#### **d. Visualisatie van data**
- **Overzicht van vaardigheden**:
  - Vaardigheden en hun viewcounts worden weergegeven in een tabel.
- **Gebruikersspecifieke data**:
  - De sessietijd en laatste online tijd van de gebruiker worden weergegeven op een aparte pagina.
- Data wordt geformatteerd naar een leesbaar formaat (bijv. `hh:mm:ss` en volledige datums).

#### **e. Styling en UX**
- CSS gebruikt om de UI responsief en gebruiksvriendelijk te maken.
- Navigatiebalk toegevoegd om eenvoudig tussen pagina's te navigeren.

---

### **4. Volgende stappen**
- Implementeren van jobinteracties en het tracken van clicks op jobs.
- Meer geavanceerde data-analyses toevoegen, zoals trends in vaardigheden.
- De styling verder verbeteren voor een professionele uitstraling.

---

## **Conclusie**
Dit project is een combinatie van technische vaardigheden en gebruikersinzichten. Door het tracken van gebruikersgedrag en het analyseren van populaire vaardigheden kan ik een platform bouwen dat niet alleen functioneel is, maar ook waarde toevoegt aan de multimediasector. De opgedane kennis in data-analyse en applicatieontwikkeling heeft me geholpen om mijn concept om te zetten in een werkend product.

