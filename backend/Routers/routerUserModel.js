import express from "express";
import multer from "multer";
import path from "path";
import { user } from "../model/userModel.js"; // Ensure the path is correct and ".js" is added if "type": "module"

const routerUser = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/"); // Save files to the "assets" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with unique name
  },
});

const upload = multer({ storage });

// Create a new Admin
routerUser.post("/", upload.single("image"), async (req, res) => {
  try {
    const { username, password, email,DoB,
      phoneNumber,
      address,
      facebook,
      linkedIn,
      twitter,
      bio,
      } = req.body;

    // Validate required fields for Admin
    if (!username || !password || !email) {
      return res.status(400).send({
        message: "Username, password, and email are required fields",
      });
    }

    // Check if an image is uploaded
    const imagePath = req.file ? `/assets/${req.file.filename}` : null;

    // Create the new admin object
    const newUser = new user({
      username,
      password,
      email,
      DoB,
      phoneNumber,
      address,
      facebook,
      linkedIn,
      twitter,
      bio,
      image: imagePath,
    });

    // Save the admin to the database
    const savedAdmin = await newUser.save();
    return res.status(201).send(savedAdmin);
  } catch (error) {
    console.error("Error during user creation:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get all books
routerUser.get("/", async (req, res) => {
  try {
    const books = await user.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error fetching user:", error.message);
    return res.status(500).send({ message: error.message });
  }
});


// Get a single book by ID
routerUser.get("/:id", async (req, res) => {
  try {
    const book = await user.findById(req.params.id);

    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log("Error fetching user by ID:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Update a book by ID 
routerUser.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { username, password, email ,DoB,
      phoneNumber,
      address,
      facebook,
      linkedIn,
      twitter,
      bio} = req.body;

    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).send({
        message: "Username, Password, and E-mail are required fields",
      });
    }

    // Check if an image is uploaded
    const imagePath = req.file ? `/assets/${req.file.filename}` : undefined;

    // Update the book
    const updatedData = {
      username,
      password,
      email,
      DoB,
      phoneNumber,
      address,
      facebook,
      linkedIn,
      twitter,
      bio
    };

    if (imagePath) {
      updatedData.image = imagePath; // Add image path only if a new image is uploaded
    }

    const updated = await user.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true } // Return the updated document
    );

    // Check if the book was found and updated
    if (!updated) {
      return res.status(404).send({ message: "user not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error on updating "+ user.id +":", error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Delete a book by ID
routerUser.delete("/:id", async (req, res) => {
  try {
    const deleted = await user.findByIdAndDelete(req.params.id);

    // Check if the book was found and deleted
    if (!deleted) {
      return res.status(404).send({ message: "user not found" });
    }

    return res.status(200).json({ message: "user deleted successfully", deleted });
  } catch (error) {
    console.log("Error deleting user:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default routerUser;
