import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .delete('http://localhost:3000/book/' + id) // Corrected backend URL
      .then(() => {
        setLoading(false);
        navigate('admin'); // Redirect after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting book:', error.message);
        alert('An error occurred, please try again.');
        setLoading(false);
      });
  }, [id, navigate]); // Added `id` to the dependency array

  return (
    <section className="p-4">
      <h1 className="text-3xl my-4">Deleting the book...</h1>
      {loading ? <Spinner /> : <p>Book deleted successfully.</p>}
    </section>
  );
};

export default DeleteBook;
