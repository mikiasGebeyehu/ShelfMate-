import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // Navigation hook
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ Fix: Define error state

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/book/${id}`) // ✅ Fix: Use correct API URL
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
        setLoading(false);
      });
  }, [id]);

  const handleDownload = async () => {
    try {
      if (!book || !book.bookFile) {
        alert("File not available for download.");
        return;
      }
  
      // ✅ Extract file name from the book's file path
      const fileName = book.bookFile.split("/").pop();
  
      // ✅ Make request to backend to download file
      const response = await fetch(`http://localhost:3000/download/${fileName}`);
  
      const result = await response.json();
  
      if (response.ok) {
        alert(`Book downloaded successfully! File saved to: ${result.filePath}`);
      } else {
        alert(`Failed to download: ${result.error}`);
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download the book.");
    }
  };
  
  

  // ✅ Handle Delete Book
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:3000/book/${id}`);
        alert("Book deleted successfully!");
        navigate("/"); // Redirect to home page
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("Failed to delete book.");
      }
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center">Book not found.</p>;

  return (
    <div className="flex flex-col  justify-center mt-10 space-y-6 p-6 mx-auto md:flex-row md:space-y-0 md:space-x-6">
      <div className="justify-center item-center text-left p-5 ">
          <img
              src={`http://localhost:3000${book.image}`}
              alt={book.title}
              className=""
              width={300}
            />
            <h2 className="text-3xl font-bold m-4 iceberg-regular bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text text-4xl">{book.title}</h2>
          <p className="text-gray-700 m-4 playwrite text-lg"><strong>Author:</strong> {book.Author}</p>
          <p className="text-gray-700 m-4 playwrite text-lg"><strong>Published Year:</strong> {book.published_year}</p>

          <div>
              {book.bookFile && (
              <div className="m-4 ">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-800 text-black text-2xl rounded-xl hover:bg-blue-600"
                >
                  📥 Download Book
                </button>
              </div>
              )}
          </div>
      </div>

      <div className="">
        <h3 className="m-4 text-center text-5xl text-yellow-400 dosis-regular">Description</h3>
         <p className="text-xl  p-10 max-w-xl delius-swash-caps-regular">
            Ethiopian literature has a rich history that dates back to ancient times.
             The country is known for its unique script, Ge'ez, which has been used for centuries
              to write religious texts, historical chronicles, and literary works. Modern Ethiopian
               literature often explores themes of identity, culture, and social issues, reflecting the diverse experiences of its people. Notable Ethiopian authors include Maaza Mengiste, Dinaw Mengestu, and Nega Mezlekia, whose works have gained international recognition and acclaim.
         </p>

          <div className="flex space-x-4 m-10 text-center">
        <button
            onClick={() => navigate(`/book/edit/${book._id}`)} // ✅ Fix: Use `book._id`
            className="px-4 py-2  bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            ✏️ Comment
        </button>
        
        <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          >
            🔙 Back
        </button>
        <button
          onClick={() => alert("Rating feature coming soon!")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ⭐ Rate Book
        </button>
      </div>

      </div>
        
      
    </div>
  );
};

export default BookDetail;
