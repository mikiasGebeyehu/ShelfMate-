import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

const EditBook = () => {
  const { id } = useParams(); // Get book ID from route parameters
  const [title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [published_year, setPublished_year] = useState('');
  const [image, setImage] = useState(null); // For new image upload
  const [existingImage, setExistingImage] = useState(''); // To display the existing image
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the existing book details
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/book/${id}`)
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.Author);
        setPublished_year(book.published_year);
        setExistingImage(book.image); // Set the existing image URL
        setLoading(false);
        
      })
      .catch((error) => {
        console.error('Error fetching book details:', error.message);
        alert('Failed to fetch book details. Please check the console for more info.');
        setLoading(false);
      });
  }, [id]);

  const handleUpdateBook = async () => {
    if (!title || !Author || !published_year) {
      alert('Title, Author, and Published Year are required!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('Author', Author);
    formData.append('published_year', published_year);

    // Add image to FormData only if a new one is selected
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/book/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate('admin'); // Navigate back to the home page on success
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('An error occurred while updating the book. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading ? <Spinner /> : null}

      <div className="flex flex-col space-y-4 max-w-xl border-2 border-yellow-300 p-4 rounded-xl w-[600px] mx-auto">
        <label className="text-3xl text-blue-300">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Author</label>
        <input
          type="text"
          value={Author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Published Year</label>
        <input
          type="number"
          value={published_year}
          onChange={(e) => setPublished_year(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Existing Image</label>
        {existingImage && (
          <img
            src={existingImage}
            alt="Existing Book"
            className="w-full h-64 object-cover rounded-md mb-2"
          />
        )}

        <label className="text-3xl text-blue-300">Upload New Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <button
          className="p-2 bg-blue-300 text-white rounded-md w-full hover:bg-blue-400"
          onClick={handleUpdateBook}
        >
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default EditBook;
