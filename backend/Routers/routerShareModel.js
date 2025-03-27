import express from "express";
import multer from "multer";
import path from "path";
import { share } from "../model/shareModel.js"; // Ensure the path is correct and ".js" is added if "type": "module"

const routershare = express.Router();

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

// Create a new share
routershare.post("/", upload.single("image"), async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.session.user) {
      return res.status(401).json({ message: "You must be logged in to post." });
    }

    const { post_Desc } = req.body;
    const post_man = req.session.user.username; // Get username from session

    // Check if an image is uploaded
    const imagePath = req.file ? `/assets/${req.file.filename}` : null;

    // Create the new share object
    const newshare = new share({
      post_Desc,
      post_man,
      image: imagePath,
    });

    // Save the share to the database
    const savedshare = await newshare.save();
    return res.status(201).json({ success: true, post: savedshare });
  } catch (error) {
    console.error("Error during share creation:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get a single book by ID
routershare.get("/", async (req, res) => {
    try {
      const posts = await share.find().sort({ createdAt: -1 });  // Get newest first
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// Update a book by ID book
routershare.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { post_Desc, post_man } = req.body;

    // Validate required fields
    if (!post_Desc || !post_man) {
      return res.status(400).json({
        message: "Post description and post owner are required fields",
      });
    }

    // Check if an image is uploaded
    const imagePath = req.file ? `/assets/${req.file.filename}` : undefined;

    // Prepare update data
    const updatedData = {
      post_Desc,
      post_man, // Ensure the post owner is also updated if needed
    };

    if (imagePath) {
      updatedData.image = imagePath; // Add new image path if uploaded
    }

    // Update the post
    const updated = await share.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, // Return the updated document
    });

    // Check if the post was found and updated
    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating post:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Delete a book by ID
routershare.delete("/:id", async (req, res) => {
  try {
    const deleted = await share.findByIdAndDelete(req.params.id);

    // Check if the book was found and deleted
    if (!deleted) {
      return res.status(404).send({ message: "share not found" });
    }

    return res.status(200).json({ message: "share deleted successfully", deleted });
  } catch (error) {
    console.log("Error deleting share:", error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default routershare;
