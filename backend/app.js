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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection(usersCollection).findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const sessionToken = uuidv4();

    await db.collection(usersCollection).updateOne(
      { email },
      { $set: { sessionToken } }
    );

    res.json({
      sessionToken,
      user: { id: user._id, username: user.username },
    });
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
