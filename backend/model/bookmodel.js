import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    published_year: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // Storing the image as a URL
      required: false, // Not required
    },
    bookFile : {
      type:String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
