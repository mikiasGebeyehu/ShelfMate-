import axios from "axios";
import React, { useState, useEffect } from "react"; // Added missing useEffect import
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Admin, setAdmins] = useState([]); // Fixed to handle multiple admins
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/Admin") // Ensure this endpoint returns an array of admins
      .then((res) => {
        setAdmins(res.data); // Store the array of admins
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error.message);
        setError("Failed to fetch admin data. Please try again later.");
        setLoading(false);
      });
  }, []); // Dependency array ensures it only runs once

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check credentials against admin data
    const admin = Admin.find(
      (a) => a.username === username && a.password === password
    );

    if (admin) {
      navigate("/admin"); // Replace with your actual dashboard route
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#3B3839]">
      <div className="w-full max-w-3xl bg-black p-8 rounded shadow-lg">
        <h1 className="text-7xl font-bold iceberg-regular text-center mb-10 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Admin Login
        </h1>

        {loading && (
          <div className="text-blue-500 text-center mb-10">Loading...</div>
        )}

        {error && (
          <div className="text-red-500 text-center mb-10">{error}</div>
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

          <div className="mb-10">
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

          <button
            type="submit"
            className="w-full text-3xl text-black bg-blue-500 playwrite py-2 px-4 rounded hover:bg-blue-600 transition mb-10 bg-gradient-to-r from-orange-500 to-orange-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
