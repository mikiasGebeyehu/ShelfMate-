import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Book } from "../model/bookmodel.js"; // Ensure correct path

const router = express.Router();

// Ensure directories exist before uploading
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// // ✅ Multer Storage Configuration for Images
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "assets/images";
//     ensureDirExists(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// ✅ Multer Storage Configuration for Images
// const BookStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "assets/BookFile";
//     ensureDirExists(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // ✅ Multer Upload Middleware for Images

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = file.fieldname === "image" ? "assets/images" : "assets/BookFile";
      ensureDirExists(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});


router.post("/", upload.fields([{ name: "bookFile", maxCount: 1 }, { name: "image", maxCount: 1 }]), async (req, res) => {
  try {
    const { title, Author, published_year } = req.body;

    // ✅ Validate Fields
    if (!title || !Author || !published_year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if Files Were Uploaded (Fixed incorrect field name)
    if (!req.files || !req.files.bookFile || !req.files.image) {
      return res.status(400).json({ message: "Both book file and image are required" });
    }

    // ✅ Get File Paths (Fixed incorrect path syntax)
    const bookPath = `/assets/BookFile/${req.files.bookFile[0].filename}`;
    const imagePath = `/assets/images/${req.files.image[0].filename}`;

    // ✅ Save to MongoDB
    const newBook = new Book({
      title,
      Author,
      published_year,
      bookFile: bookPath,
      image: imagePath,
    });

    const savedBook = await newBook.save();
    return res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error saving book:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Route for Deleting a Book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Route for Getting All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Route for Getting a Single Book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;