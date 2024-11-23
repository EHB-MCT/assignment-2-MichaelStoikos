const express = require("express");
const cors = require("cors");
const config = require("./config/config.json")
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;
const url = config.final_url;
const dbName = "Data-Dev5";
const skillsCollection = "Skills";

app.use(cors())
app.use(express.json());

let db;
const client = new MongoClient(url)

client
    .connect()
    .then(() => {
        db = client.db(dbName);
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

app.get("/Skills", async (req, res) => {
    try {
        const collection = db.collection(skillsCollection);
        const skills = await collection.find({}).toArray();
        res.json({
            message: "Successfully fetched all the skills",
            data: skills,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});