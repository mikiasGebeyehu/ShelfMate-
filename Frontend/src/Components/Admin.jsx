import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md"; // Delete icon
import { BsInfoCircle } from "react-icons/bs"; // Info/View icon
import { AiOutlineEdit } from "react-icons/ai"; // Edit icon
import { Link } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [Admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [published_year, setPublished_year] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchAdmins();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/user")
      .then((res) => {
        
        setUsers(res.data); // Fixed: update the correct state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const fetchAdmins = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/Admin")
      .then((res) => {
        setAdmins(res.data); // Fixed: update the correct state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Admins:", error);
        setLoading(false);
      });
  };

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/book")
      .then((res) => {
        setBooks(res.data); // Fixed: update the correct state
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching books:", error);
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  };
  const deleteUser = (userId) => {
    setLoading(true)
    axios
    .delete(`http://localhost:3000/user/${userId}`)
    .then(() => (
      setLoading(true),
      navigate(0)
    ))
    .catch((err) => (
        alert("Error fetching books:", error),
        console.error("Error fetching books:", error),
        setLoading(false)
    ))
    .finally(() => {
      setLoading(false);
    });
  }

  const deleteAdmin = (AdminId) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/Admin/${AdminId}`)
      .then((res) => {
        setSuccess("Admin deleted successfully.");
        fetchAdmins(); // Ensure correct function is called
      })
      .catch((error) => {
        console.error("Error deleting Admin:", error.message);
        alert("Error deleting Admin: " + error.message);
        setError("Failed to delete Admin. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const deleteBook = (BookId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
  
    if (!isConfirmed) {
      return; // Stop execution if the admin cancels
    }
  
    setLoading(true);
    axios
      .delete(`http://localhost:3000/book/${BookId}`)
      .then((res) => {
        setSuccess("Admin deleted successfully.");
        navigate(0);
      })
      .catch((error) => {
        console.error("Error deleting Admin:", error.message);
        alert("Error deleting Admin: " + error.message);
        setError("Failed to delete Admin. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!title || !Author || !published_year || !image || !bookFile) {
      alert("All fields are required, including the image and book file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Author", Author);
    formData.append("published_year", published_year);
    formData.append("image", image); // Append the image file
    formData.append("bookFile", bookFile); // Append the book file

    try {
      setLoading(true);

      // ✅ Ensure correct API URL (Express backend)
      await axios.post("http://localhost:3000/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      alert("Book uploaded successfully!");
      navigate("/"); // Redirect to homepage after success
    } catch (error) {
      console.error("Error saving book:", error);
      alert("An error occurred while saving the book. Please check the console.");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {loading && <div className="text-blue-500 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white  shadow-xl shadow-black rounded-lg">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="p-4 bg-white  shadow-xl shadow-black rounded-lg">
          <h2 className="text-xl font-bold">Total Books</h2>
          <p className="text-2xl">{books.length}</p>
        </div>
        <div className="p-4 bg-white  shadow-xl shadow-black rounded-lg">
          <h2 className="text-xl font-bold">Total Admins</h2>
          <p className="text-2xl">{Admins.length}</p>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white p-6 shadow-2xl shadow-black rounded-lg mb-8 ">
        <h2 className="text-2xl justify-center text-center  font-bold mb-4">User Management</h2>
        {users.length > 0 ? (
          <table className="w-full border border-gray-500 shadow-xl text-center items-center shadow-black rounded-lg overflow-hidden mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    
                        <button
                          onClick={() => deleteUser(user._id)} // Inline delete handler
                          className="flex px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600"
                        >
                          <MdOutlineDelete className="text-black text-2xl" /> Delete
                        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Book Management */}
      <div className="bg-white p-6 shadow rounded mb-8">
        <h2 className="text-2xl justify-center text-center text-2xl font-bold mb-4">Book Management</h2>
        {books.length > 0 ? (
          <table className="w-full border border-gray-500 shadow-xl text-center items-center shadow-black rounded-lg overflow-hidden mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.Author}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2 justify-center text-center items-center">
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteBook(book._id)} // Inline delete handler
                          className="flex px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600"
                        >
                          <MdOutlineDelete className="text-black text-2xl" /> Delete
                        </button>

                        {/* View Details Button */}
                        <Link to={`/book/${book._id}`}>
                          <button className="flex px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600">
                            <BsInfoCircle className="text-black text-2xl" /> View
                          </button>
                        </Link>

                        {/* Edit Button */}
                        <Link to={`/book/edit/${book._id}`}>
                          <button className="flex px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600">
                            <AiOutlineEdit className="text-black text-2xl" /> Edit
                          </button>
                        </Link>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* Admin Management */}
      <div className="bg-white p-6 shadow-2xl shadow-black rounded-lg mb-8 justify-center text-center items-center">
        <h2 className="text-2xl font-bold mb-4">Admin Management</h2>
        {Admins.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Admins.map((Admin) => (
                <tr key={Admin._id}>
                  <td className="border px-4 py-2">{Admin.username}</td>
                  <td className="border px-4 py-2">{Admin.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteAdmin(Admin._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Admins found.</p>
        )}
      </div>
      
      {/* File Upload */}
      <div className="bg-white p-6 shadow-2xl shadow-black rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">File Upload</h2>
        <form onSubmit={handleFileUpload}>
          {/* Title */}
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 bg-white p-2 rounded w-full mb-4"
            required
          />

          {/* Author */}
          <label htmlFor="author" className="block font-semibold">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 bg-white p-2 rounded w-full mb-4"
            required
          />

          {/* Published Year */}
          <label htmlFor="published_year" className="block font-semibold">
            Published Year
          </label>
          <input
            type="number"
            id="published_year"
            value={published_year}
            onChange={(e) => setPublished_year(e.target.value)}
            className="border-2 bg-white p-2 rounded w-full mb-4"
            required
          />

          {/* Image Upload */}
          <label htmlFor="image" className="block font-semibold">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Book File Upload */}
          <label htmlFor="bookFile" className="block font-semibold">
            Book File
          </label>
          <input
            type="file"
            id="bookFile"
            accept=".pdf,.doc,.docx,.ppt,.pptx"            
            onChange={(e) => setBookFile(e.target.files[0])}
            className="border p-2 rounded w-full mb-4"
            required
          />

          {/* Upload Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
          >
            Upload
          </button>
        </form>
      </div>

    </div>
  );
}

export default Admin;

{/* <label htmlFor=""
           className=""
          > File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full mb-4"
          /> */}

//  // Fetch data on component mount
//  useEffect(() => {
//   fetchUsers();
//   fetchBooks();
//   fetchAdmins();
// }, []);

// const fetchUsers = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get("http://localhost:3000/user");
//     setUsers(response.data);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     setError("Failed to fetch users. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// // Fetch all books
// const fetchBooks = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get("http://localhost:3000/book");
//     setBooks(response.data);
//   } catch (error) {
//     console.error("Error fetching books:", error.message);
//     setError("Failed to fetch books. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// // Fetch all Admins
// const fetchAdmins = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get("http://localhost:3000/Admin");
//     setAdmins(response.data);
//   } catch (error) {
//     console.error("Error fetching Admins:", error.message);
//     setError("Failed to fetch Admins. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// const deleteUser = async (userId) => {
//   setLoading(true);
//   try {
//     await axios.delete(`http://localhost:3000/user/${userId}`);
//     setSuccess("User deleted successfully.");
//     fetchUsers();
//   } catch (error) {
//     console.error("Error deleting user:", error.message);
//     setError("Failed to delete user. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// // Delete a book
// const deleteBook = async (bookId) => {
//   setLoading(true);
//   try {
//     await axios.delete(`http://localhost:3000/book/${bookId}`);
//     setSuccess("Book deleted successfully.");
//     fetchBooks();
//   } catch (error) {
//     console.error("Error deleting book:", error.message);
//     setError("Failed to delete book. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// // Delete an Admin
// const deleteAdmin = async (AdminId) => {
//   setLoading(true);
//   try {
//     await axios.delete(`http://localhost:3000/Admin/${AdminId}`);
//     setSuccess("Admin deleted successfully.");
//     fetchAdmins();
//   } catch (error) {
//     console.error("Error deleting Admin:", error.message);
//     setError("Failed to delete Admin. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };

// // Handle file upload
// const handleFileUpload = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("file", file);

//   setLoading(true);
//   try {
//     await axios.post("http://localhost:3000/Admin/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     setSuccess("File uploaded successfully.");
//   } catch (error) {
//     console.error("Error uploading file:", error.message);
//     setError("Failed to upload file. Please try again later.");
//   } finally {
//     setLoading(false);
//   }
// };