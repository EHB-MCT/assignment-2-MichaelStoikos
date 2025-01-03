const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const config = require("./config/config.json")

const app = express();
const PORT = process.env.PORT || 5000;
const dbName = "Data-Dev5";
const skillsCollection = "Skills";
const usersCollection = "Users";
const mongoUrl = config.MONGO_URI;

app.use(cors());
app.use(express.json());

let db;
const client = new MongoClient(mongoUrl);

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

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await db.collection(usersCollection).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      profileCompleted: false,
      bio: "",
      profileImage: "",
      rating: 0,
      primarySkill: "",
      secondarySkill: "",
    };

    await db.collection(usersCollection).insertOne(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const activeSessions = {};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection(usersCollection).findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const sessionToken = uuidv4();
    const startTime = Date.now();

    await db.collection(usersCollection).updateOne(
      { email },
      { $set: { sessionToken, startTime } }
    );

    activeSessions[sessionToken] = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      console.log(`Time spent on site for session ${sessionToken}: ${elapsedSeconds} seconds`);
    }, 30000);

    res.json({ sessionToken, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const authMiddleware = async (req, res, next) => {
  const sessionToken = req.header("Authorization");
  if (!sessionToken) {
    return res.status(401).json({ message: "No session token provided" });
  }

  try {
    const user = await db.collection(usersCollection).findOne({ sessionToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid session token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

app.get("/skills", authMiddleware, async (req, res) => {
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

app.post("/Skills/:id/click", async (req, res) => {
  const skillId = parseInt(req.params.id);

  try {
    const result = await db.collection(skillsCollection).updateOne(
      { id: skillId },
      { $inc: { views: 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill click tracked successfully" });
  } catch (error) {
    console.error("Error incrementing skill views:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", async (req, res) => {
  const sessionToken = req.header("Authorization");

  try {
    const user = await db.collection(usersCollection).findOne({ sessionToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid session token" });
    }

    const elapsedSeconds = Math.floor((Date.now() - user.startTime) / 1000);

    await db.collection(usersCollection).updateOne(
      { sessionToken },
      { $inc: { totalTimeSpentInSeconds: elapsedSeconds } }
    );

    console.log(`Session ${sessionToken} finalized. Total time: ${elapsedSeconds} seconds`);

    clearInterval(activeSessions[sessionToken]);
    delete activeSessions[sessionToken];

    res.status(200).json({ message: "Session finalized successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
