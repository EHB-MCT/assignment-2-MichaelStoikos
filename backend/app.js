/**
 * Import dependencies and setup server configurations
 */
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


/**
 * Initialize MongoDB connection
 */
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

/**
 * @route POST /register
 * @description Registers a new user
 * @param {string} username - User's username
 * @param {string} email - User's email address
 * @param {string} password - User's password (hashed and stored)
 * @returns Success or error response
 */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.collection(usersCollection).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user document
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

/**
 * Active sessions tracker
 */
const activeSessions = {};

/**
 * @route POST /login
 * @description Logs in a user and starts a session
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns Session token and success response
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await db.collection(usersCollection).findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate session token and track start time
    const sessionToken = uuidv4();
    const startTime = Date.now();
    const currentDate = new Date().toISOString(); 

    // Update user session data
    await db.collection(usersCollection).updateOne(
      { email },
      {
        $set: {
          sessionToken,
          startTime,
          PreviouslyConnectedOn: currentDate, 
        },
      }
    );

    // Track active session
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

/**
 * Middleware to authenticate user using session token
 */
const authMiddleware = async (req, res, next) => {
  const sessionToken = req.header("Authorization");
  if (!sessionToken) {
    return res.status(401).json({ message: "No session token provided" });
  }

  try {
    // Validate session token
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

/**
 * @route GET /skills
 * @description Fetches all skills and their view counts
 * @returns List of skills with view counts
 */
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

/**
 * @route POST /Skills/:id/click
 * @description Tracks clicks/views for a specific skill
 * @param {number} id - Skill ID
 * @returns Success or error response
 */
app.post("/Skills/:id/click", async (req, res) => {
  const skillId = parseInt(req.params.id);

  try {
    // Increment view count for the skill
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

/**
 * @route POST /logout
 * @description Logs out a user and finalizes session data
 * @returns Success or error response
 */
app.post("/logout", async (req, res) => {
  const sessionToken = req.header("Authorization");

  try {
    // Find user by session token
    const user = await db.collection(usersCollection).findOne({ sessionToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid session token" });
    }

    // Calculate total session time
    const elapsedSeconds = Math.floor((Date.now() - user.startTime) / 1000);

     // Update total time spent in the database
    await db.collection(usersCollection).updateOne(
      { sessionToken },
      { $inc: { totalTimeSpentInSeconds: elapsedSeconds } }
    );

    console.log(`Session ${sessionToken} finalized. Total time: ${elapsedSeconds} seconds`);

    // Clear session interval and remove from active sessions
    clearInterval(activeSessions[sessionToken]);
    delete activeSessions[sessionToken];

    res.status(200).json({ message: "Session finalized successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /user-data
 * @description Fetches user-specific data such as total time spent and last online
 * @returns User-specific data
 */
app.get("/user-data", authMiddleware, async (req, res) => {
  try {
    const user = await db.collection(usersCollection).findOne(
      { sessionToken: req.user.sessionToken },
      { projection: { username: 1, totalTimeSpentInSeconds: 1, PreviouslyConnectedOn: 1 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      totalTimeSpentInSeconds: user.totalTimeSpentInSeconds || 0,
      PreviouslyConnectedOn: user.PreviouslyConnectedOn || "N/A",
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Start the server
 */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
