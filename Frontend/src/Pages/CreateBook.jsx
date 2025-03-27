import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [published_year, setPublished_year] = useState("");
  const [bookFile, setBookFile] = useState(null); // ✅ Fixed: bookFile should be null initially
  const [image, setImage] = useState(null); // ✅ Fixed: image should be null initially
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    if (!title || !Author || !published_year || !image || !bookFile) {
      alert("All fields are required, including the image and book file!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("Author", Author);
    formData.append("published_year", published_year);
    formData.append("image", image); // Append the image file
    formData.append("bookFile", bookFile); // Append the book file

    try {
      await axios.post("http://localhost:3000/book", formData);
      setLoading(false);
      navigate("/"); // Redirect on success
    } catch (error) {
      console.error("Error saving book:", error.message);
      alert("An error occurred while saving the book. Please check the console.");
      setLoading(false);
    }
  };

  return (
    <section className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>

      {loading ? <Spinner /> : null}
      <div className="flex flex-col space-y-4 max-w-xl border-2 border-yellow-300 p-4 rounded-xl w-[600px] mx-auto">
        <label className="text-3xl mr-4 text-blue-300">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl mr-4 text-blue-300">Author</label>
        <input
          type="text"
          value={Author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl mr-4 text-blue-300">Published Year</label>
        <input
          type="number"
          value={published_year}
          onChange={(e) => setPublished_year(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl mr-4 text-blue-300">Image</label>
        <input
          type="file"
          accept="image/*" // ✅ Ensures only image files can be selected
          onChange={(e) => setImage(e.target.files[0])} // Store the selected file
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl mr-4 text-blue-300">Book file</label>
        <input
          type="file"
          accept=".pdf,.epub,.mobi,.txt,.docx" // ✅ Ensures only book files can be selected
          onChange={(e) => setBookFile(e.target.files[0])} // Store the selected file
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <button
          className="p-2 bg-blue-300 text-white rounded-md w-full hover:bg-blue-400"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default CreateBook;
