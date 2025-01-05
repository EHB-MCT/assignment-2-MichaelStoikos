# **Vaardigheden Uitwisselingsplatform**

Een website die professionals in de multimediasector samenbrengt om vaardigheden uit te wisselen. Dit platform biedt een alternatief voor commerciële diensten zoals Fiverr, waarbij gebruikers hun expertise kunnen ruilen zonder financiële transacties.

---

## **Inhoudsopgave**
1. [Over het project](#over-het-project)
2. [Functionaliteiten](#functionaliteiten)
3. [Technologieën](#technologieën)
4. [Installatie](#installatie)
5. [Gebruik](#gebruik)
6. [API-endpoints](#api-endpoints)
7. [Licentie](#licentie)
8. [Contact](#contact)

---

## **1. Over het project**

Dit project is ontworpen om een platform te bieden waar professionals in de multimediasector vaardigheden kunnen uitwisselen. Het doel is om samenwerking en creativiteit te stimuleren door middel van directe skill-swaps.

Gebruikers kunnen:
- Vaardigheden aanbieden en zoeken.
- Tijd doorbrengen op de website terwijl hun interacties worden getrackt.
- Data bekijken zoals sessietijd en populariteit van vaardigheden.

De verzamelde data wordt gebruikt om het platform continu te optimaliseren en de gebruikerservaring te verbeteren.

---

## **2. Functionaliteiten**

- **Gebruikersregistratie en login**: Beveiligde toegang met sessietokens en gehashte wachtwoorden.
- **Vaardighedenoverzicht**: Een pagina waar alle vaardigheden worden weergegeven en hoe vaak deze zijn bekeken.
- **Jobs & interacties**: Gebruikers kunnen jobs bekijken en er interactie mee hebben.
- **Visualisatie van data**:
  - Overzicht van vaardigheden (populariteit, aantal clicks).
  - Persoonlijke statistieken (sessietijd, laatst online).

---

## **3. Technologieën**

### **Frontend**
- **ReactJS**: Voor het bouwen van de gebruikersinterface.
- **React Router**: Voor navigatie en routing.
- **Axios**: Voor API-communicatie.

### **Backend**
- **Node.js**: Voor het opzetten van de server.
- **ExpressJS**: Voor het maken van RESTful API's.
- **MongoDB**: Voor opslag van gebruikers- en vaardighedeninformatie.

---

## **4. Installatie**

Volg deze stappen om het project lokaal op te zetten:

### **Backend**
1. Navigeer naar de `backend`-map:
   ```bash
   cd backend
    ```
2. Installeer de vereisten:
    ```bash
   npm install
    ```
3. Maak een config.json-bestand in de config folder en voeg de volgende variabele toe: 
    ```bash
   {
    "MONGO_URI":  "mongodb+srv://heusdens:heusdens@fullproject3heusdensinc.wydmojn.mongodb.net/?retryWrites=true&w=majority&appName=FullProject3Heusdensinc"
    }
    ```
4. Start de backend-server:
    ```bash
    node app.js
    ```
### **Frontend**
1. Navigeer naar de frontend-map
    ```bash
   cd frontend
    ```
2. Installeer de vereisten
    ```bash
   npm install
    ```
3. Start de React-app
    ```bash
   npm run dev
    ```
De applicatie zal draaien op http://localhost:3000.

## **5. Gebruik**
### **Registreren en inloggen**
- Maak een account aan via de /register-pagina.
- Log in via de /login-pagina.
### **Vaardigheden bekijken**
- Bezoek de vaardighedenpagina om te zien welke vaardigheden beschikbaar zijn en hoeveel views ze hebben.
### **Visualisatiepagina**
- Bekijk persoonlijke en algemene data zoals sessietijd, laatst online en populariteit van vaardigheden.

## **6. API-endpoints**
Hier zijn de belangrijkste API-endpoints die beschikbaar zijn:

### **Authenticatie**
- POST /register: Registreer een nieuwe gebruiker.
- POST /login: Log in met gebruikersgegevens.
### **Vaardigheden**
- GET /skills: Haal alle beschikbare vaardigheden op.
- POST /skills/:id/click: Voeg een view toe aan een specifieke vaardigheid.
### **Gebruikersgegevens**
- GET /user-data: Haal persoonlijke gebruikersdata op (sessietijd, laatst online).
- POST /logout: Finaliseer de sessie en update de tijd in de database.

## **7. Licentie**
Dit project is uitsluitend bedoeld voor educatieve doeleinden.

8. Contact
Voor vragen of feedback over dit project, neem contact op via:

- Naam: Michael Stoikos
- E-mail: michael.stoikos@outlook.com
