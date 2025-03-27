import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [postOwner, setPostOwner] = useState(""); // Store original post creator

  useEffect(() => {
    if (!id) {
      console.error("Error: Post ID is undefined!");
      return;
    }

    console.log("Fetching data for post ID:", id);
    fetchSessionUser();
    fetchPostDetails();
  }, [id]);

  const fetchSessionUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/session", { withCredentials: true });
      if (res.data && res.data.username) {
        setSessionUser(res.data);
      } else {
        console.error("Error: No user session found.");
      }
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/share/${id}`);
      setPostDesc(res.data.post_Desc);
      setExistingImage(res.data.image);
      setPostOwner(res.data.post_man); // Store original post creator
    } catch (error) {
      console.error("Error fetching post details:", error.message);
    }
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();

    if (!sessionUser) {
      alert("You must be logged in to edit a post.");
      return;
    }

    if (!id) {
      console.error("Error: Post ID is undefined!");
      alert("Error: Post ID is missing.");
      return;
    }

    // Ensure only the original post creator can edit
    if (sessionUser.username !== postOwner) {
      alert("You are not authorized to edit this post.");
      return;
    }

    const formData = new FormData();
    formData.append("post_Desc", postDesc);
    formData.append("post_man", sessionUser.username);
    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      console.log(`Updating post with ID: ${id}`);
      const res = await axios.put(`http://localhost:3000/share/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        alert("Post updated successfully!");
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
      <p className="text-white">Post ID: {id}</p>
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Edit Post</h2>

      {sessionUser && (
        <div className="mb-4 flex items-center space-x-4">
          <img
            src={sessionUser.image || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <h3 className="text-lg text-white">Editing as: {sessionUser.username}</h3>
        </div>
      )}

      <form onSubmit={handlePostUpdate}>
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white"
          placeholder="Edit your post..."
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
        ></textarea>

        {existingImage && (
          <div className="mt-3">
            <p className="text-white">Current Image:</p>
            <img src={`http://localhost:3000${existingImage}`} alt="Post" className="w-full rounded-md" />
          </div>
        )}

        <input
          type="file"
          className="mt-3 text-white"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
        />

        <button type="submit" className="mt-4 w-full bg-orange-500 p-2 rounded-md text-white font-bold">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;