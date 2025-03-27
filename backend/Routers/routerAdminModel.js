import express from "express";
import multer from "multer";
import path from "path";
import { Admin } from "../model/adminModel.js"; // Ensure the path is correct and ".js" is added if "type": "module"

const routerAdmin = express.Router();

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
routerAdmin.post("/", upload.single("image"), async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate required fields for Admin
    if (!username || !password || !email) {
      return res.status(400).send({
        message: "Username, password, and email are required fields",
      });
    }

    // Check if an image is uploaded
    const imagePath = req.file ? `/assets/${req.file.filename}` : null;

    // Create the new admin object
    const newAdmin = new Admin({
      username,
      password,
      email,
      image: imagePath,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();
    return res.status(201).send(savedAdmin);
  } catch (error) {
    console.error("Error during Admin creation:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
// Get all books
routerAdmin.get("/", async (req, res) => {
  try {
    const books = await Admin.find();
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error fetching Admin:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get a single book by ID
routerAdmin.get("/:id", async (req, res) => {
  try {
    const book = await Admin.findById(req.params.id);

    // Check if the book exists
    if (!book) {
      return res.status(404).send({ message: "Admin not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log("Error fetching Admin by ID:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Update a book by ID book
routerAdmin.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { username, password, email } = req.body;

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
    };

    if (imagePath) {
      updatedData.image = imagePath; // Add image path only if a new image is uploaded
    }

    const updated = await Admin.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true } // Return the updated document
    );

    // Check if the book was found and updated
    if (!updated) {
      return res.status(404).send({ message: "Admin not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating Admin:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Delete a book by ID
routerAdmin.delete("/:id", async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);

    // Check if the book was found and deleted
    if (!deleted) {
      return res.status(404).send({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted successfully", deleted });
  } catch (error) {
    console.log("Error deleting Admin:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default routerAdmin;
