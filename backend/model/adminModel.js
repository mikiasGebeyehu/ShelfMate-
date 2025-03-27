import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String }, // Optional field for the image path
});

export const Admin = mongoose.model("Admin", adminSchema);
