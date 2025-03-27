import express from "express";
import { user } from "../model/userModel.js";

const authRoutes = express.Router();

// LOGIN ROUTE
authRoutes.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
  const { username, password } = req.body;

  try {
    const foundUser = await user.findOne({ username });

    console.log("Found user in DB:", foundUser);
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    if (foundUser.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    req.session.user = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      image: foundUser.image ? `http://localhost:3000${foundUser.image}` : null,
    };

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session save failed", error: err });
      }
      res.json({ success: true, message: "Login successful", user: req.session.user });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CHECK SESSION ROUTE
authRoutes.get("/session", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.session.user);
});

// LOGOUT ROUTE
authRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ success: true, message: "Logged out successfully" });
  });
});

export default authRoutes;
