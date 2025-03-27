import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPost = () => {
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    fetchSessionUser();
  }, []);

  const fetchSessionUser = async () => {
    try {
        const res = await axios.get("http://localhost:3000/auth/session", { withCredentials: true });
        setSessionUser(res.data); // Store session user data
      } catch (error) {
        console.error("Error fetching session:", error.message);
      }
    };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      alert("You must be logged in to post.");
      return;
    }

    const formData = new FormData();
    formData.append("post_Desc", postDesc);
    formData.append("post_man", sessionUser.username); // Auto-fill username from session
    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      const res = await axios.post("http://localhost:3000/share", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Post added successfully!");
        setPostDesc("");
        setPostImage(null);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Create a Post</h2>
      {sessionUser && (
        <div className="mb-4 flex items-center space-x-4">
          <img
            src={sessionUser.image || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <h3 className="text-lg text-white">Posting as: {sessionUser.username}</h3>
        </div>
      )}
      <form onSubmit={handlePostSubmit}>
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white"
          placeholder="Write something..."
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
        ></textarea>

        <input
          type="file"
          className="mt-3 text-white"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
        />

        <button type="submit" className="mt-4 w-full bg-orange-500 p-2 rounded-md text-white font-bold">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
