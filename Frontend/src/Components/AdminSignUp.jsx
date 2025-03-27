import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminSignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loadind, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
        

        const handleSubmit =async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        if (!username || !email || !password) {
        setError("All fields are required");
        return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        try {
            await axios.post("http://localhost:3000/Admin",formData ,{
                headers: {
                    "Content-Type":"multipart/form-data",
                },
            });
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error saving book:', error.message);
            alert('An error occurred while Registering. Please check the console.');
            setLoading(false);
        }

        // Mock sign-up logic (replace with API call)
        setError("");
        setSuccess("Sign-up successful! Redirecting to login...");

        setTimeout(() => {
        navigate("/admin-login");
        }, 2000);
    };
        

  return (
    <div className="flex justify-center items-center h-screen bg-[#3B3839]">
      <div className="w-full max-w-3xl bg-black p-8 rounded shadow-lg">
        <h1 className="text-7xl font-bold iceberg-regular text-center mb-10 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">Admin Sign Up</h1>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label
              htmlFor="username"
              className="block text-gray-300 font-medium mb-2 dosis-regular"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2 dosis-regular"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 font-medium mb-2 dosis-regular"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 font-medium mb-2 dosis-regular"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <label
              htmlFor="profilepic"
              className="block text-gray-300 font-medium mb-2 dosis-regular"
            >
              Proile Picture
            </label>
          <input
          type="file" // Use file input to upload images
          onChange={(e) => setImage(e.target.files[0])} // Store the selected file
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10"
        />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition "
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignUp;