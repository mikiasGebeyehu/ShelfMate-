import express from "express";
import mongoose from "mongoose";
import session from "express-session"; 
import MongoStore from "connect-mongo";
import { port, MoongoDB } from "./config.js";
import router from "./Routers/routersModels.js";
import path from "path";
import fs from "fs";
import os from "os"; // ✅ Used to get the Downloads folder
import cors from "cors";
import { fileURLToPath } from "url";
import routerAdmin from "./Routers/routerAdminModel.js";
import routerUser from "./Routers/routerUserModel.js";
import routerShare from "./Routers/routerShareModel.js";
import { Cookie } from "express-session";
import authRoutes from "./Routers/authRoutes.js"; 


// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/BookFile", express.static(path.join(__dirname, "assets/BookFile")));

const SESSION_SECRET = "your-secret-key";
const MONGO_URI = MoongoDB;
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,  // ✅ Fixed typo here
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "session",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    }
  })
);



app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});


// Option-1 for CORS middleware
app.use(cors({   origin: "http://localhost:5173", // Change this to match your frontend
  credentials: true,  }));



// Option-2 for CORS middleware
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

app.use("/book", router);
app.use("/Admin",routerAdmin);
app.use("/user", routerUser);
app.use("/share",routerShare);
app.use("/auth", authRoutes); 

app.get("/download/:fileName", (req, res) => {
  try {
    const fileName = req.params.fileName;

    // ✅ Check inside `/assets/books/` folder
    const filePath = path.join(__dirname, "assets/BookFile", fileName);

    // ✅ Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return res.status(404).json({ error: "File not found" });
    }

    // ✅ Get the user's Downloads folder
    const downloadsFolder = path.join(os.homedir(), "Downloads");

    // ✅ Ensure the Downloads folder exists
    if (!fs.existsSync(downloadsFolder)) {
      fs.mkdirSync(downloadsFolder, { recursive: true });
    }

    // ✅ Define the destination path
    const destinationPath = path.join(downloadsFolder, fileName);

    // ✅ Copy file to Downloads folder
    fs.copyFile(filePath, destinationPath, (err) => {
      if (err) {
        console.error("Error copying file:", err);
        return res.status(500).json({ error: "Failed to download file" });
      }
      res.json({ message: "Download successful!", filePath: destinationPath });
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(MoongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
