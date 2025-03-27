import { Routes, Route, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./Pages/Home";
import EditBook from "./Pages/EditBook";
import CreateBook from "./Pages/CreateBook";
import ShowBook from "./Pages/ShowBook";
import DeleteBook from "./Pages/DeleteBook";
import Navbar from "./Sections/Navbar";
import Hero from "./Sections/Hero";
import Feature from "./Sections/Feature";
import Services from "./Sections/Services";
import AdminLogin from "./Components/AdminLogin";
import AdminSignUp from "./Components/AdminSignUp";
import UserLogin from "./Components/UserLogin";
import UserSignUP from "./Components/UserSignUP";
import Admin from "./Components/Admin";
import ShowUser from "./Pages/ShowUser";
import EditUser from "./Pages/EditUser";
import Post from "./Pages/Post";
import AddPost from "./Components/addPost";
import EditPost from "./Pages/EditPost";

export default function App() {
  const [sessionUser, setSessionUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  // ✅ Check session when app loads
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/session", { withCredentials: true })
      .then((res) => {
        setSessionUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Save user persistently
      })
      .catch(() => {
        setSessionUser(null);
        localStorage.removeItem("user");
      });
  }, []);

  // ✅ Redirect only if user is not found
  useEffect(() => {
    if (sessionUser === null && window.location.pathname !== "/user-login") {
      navigate("/user-login");
    }
  }, [sessionUser, navigate]);

  if (sessionUser === undefined) return <p>Loading...</p>;

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin-login" element={<><Navbar /><AdminLogin /></>} />
        <Route path="/admin-signUp" element={<><Navbar /><AdminSignUp /></>} />
        <Route path="/user-login" element={<><Navbar /><UserLogin /></>} />
        <Route path="/user-signUp" element={<><Navbar /><UserSignUP /></>} />
        <Route path="/addPost" element={<><Navbar /><AddPost /></>} />
        <Route path="/EditPost/:id" element={<><Navbar /><EditPost /></>} />

        {/* Protected Routes (Admin & User) */}
        {sessionUser && (
          <>
            <Route path="/Post" element={<><Navbar /><Post /></>} />
          </>
        )}

        {/* Admin Routes */}
        {sessionUser?.role === "admin" && (
          <Route path="/admin" element={<><Navbar /><Admin /></>} />
        )}

        {/* User Routes */}
        <Route path="/book/:id" element={<ShowBook />} />
        <Route path="/user/:id" element={<ShowUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />

        {/* Home Page */}
        <Route
          path="*"
          element={<><Navbar /><Hero /><Feature /><Services /><Home /></>}
        />

        {/* Other Routes for Book Operations */}
        <Route path="/book/create" element={<CreateBook />} />
        <Route path="/book/edit/:id" element={<EditBook />} />
        <Route path="/book/delete/:id" element={<DeleteBook />} />
      </Routes>
    </>
  );
}
