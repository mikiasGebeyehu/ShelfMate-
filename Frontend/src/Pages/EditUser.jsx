import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import { user } from '../../../backend/model/userModel';

const EditUser = () => {
  const { id } = useParams(); 
  const [username, setUsername] = useState('');
  const [DoB, setDoB] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [image, setImage] = useState(null); // ✅ Fixed: Define image state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Added state for password visibility
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((res) => {
        const user = res.data;
        setUsername(user.username);
        setPassword(user.password);
        setEmail(user.email);
        setExistingImage(user.image);
        setDoB(user.DoB);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);
        setFacebook(user.facebook);
        setLinkedIn(user.linkedIn);
        setTwitter(user.twitter);
        setBio(user.bio); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching User details:', error.message);
        alert('Failed to fetch user details. Please check the console for more info.');
        setLoading(false);
      });
  }, [id]);

  const handleUpdateBook = async () => {
    if (!username || !password) {
      alert('Name and Password are required!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('DoB', DoB);
    formData.append('bio', bio); 
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('linkedIn', linkedIn);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate(0); 
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
        <label className="text-3xl text-blue-300">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // ✅ Toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-blue-300 rounded-md p-2 w-full pr-10"
          />
          <span
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // ✅ Toggle show/hide password
          >
            {showPassword ? "🙈" : "👁️"} {/* ✅ Change icon based on state */}
          </span>
        </div>

        <label className="text-3xl text-blue-300">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Phone Number</label>
        <input
          type="text" // ✅ Fixed incorrect type="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Date Of Birth</label>
        <input
          type="date"
          value={DoB}
          onChange={(e) => setDoB(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />  

        <label className="text-3xl text-blue-300">Bio</label>
        <input
          type="text"
          value={bio} // ✅ Fixed incorrect DoB field
          onChange={(e) => setBio(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">Facebook</label>
        <input
          type="text"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />

        <label className="text-3xl text-blue-300">LinkedIn</label>
        <input
          type="text"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        /> 

        <label className="text-3xl text-blue-300">Twitter</label>
        <input
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="border-2 border-blue-300 rounded-md p-2 w-full"
        />      

        <label className="text-3xl text-blue-300">Existing Image</label>
        {existingImage && (
          <img
            src={existingImage}
            alt="Existing User"
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

export default EditUser;
