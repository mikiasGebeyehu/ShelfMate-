import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/user/${id}`) // Fetch user data
      .then((res) => {
        console.log("User Data:", res.data); // Debugging log
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
        setLoading(false);
      });
  }, [id]);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert("Profile picture updated successfully! (Upload feature in progress)");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center">User not found.</p>;

  return (
    <div className="justify-center  space-y-10  mx-auto md:flex-row md:space-y-0 md:space-x-6">
        <div className="flex flex-col justify-center text-center items-center bg-gradient-to-r from-orange-700 to-orange-900 p-5 rounded-xl mb-10">
        <img
          src={user.image ? `http://localhost:3000${user.image}` : "/assets/default-profile.jpg"} // ✅ Fallback image
          alt={user.username || "User"}
          className="rounded-full border-4 border-orange-500"
          width={150}
        />
        <h2 className="text-6xl iceberg-regular font-bold m-4 text-black">
          {user.username} 
        </h2>
        <h4 className="playwrite text-yellow-500 text-3xl">
            online
        </h4>
        </div>


        <div className="justify-center items-center text-left p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)]">
        <p className="text-yellow-700 m-4"><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
        <p className="text-yellow-700 m-4"><strong>Bio:</strong> {user.bio}</p>
      </div>
      <p className="m-10 text-black">
          hi
      </p>

      <div className=" flex border-l-4 pl-5 justify-center items-center text-left p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4">
        <div className="text">
          <h3 className="flex border-l-4 justify-center items-center text-left p-5 bg-black mb-10 mt-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4 font-bold text-red-500">📞 Contact Information</h3>
          <p className="text-gray-300 m-5"><strong>Email:</strong> {user.email} (Verified ✅)</p>
          <p className="text-gray-300 m-5 "><strong>Phone:</strong> {user.phoneNumber} {user.whatsapp && "(WhatsApp ✅)"}</p>
          <p className="text-gray-300  m-5"><strong>Address:</strong> {user.address} {/* , {user.address?.city}, {user.address?.state}, {user.address?.zip}, {user.address?.country} */}</p>  
        </div>
          
        <div>
        <h4 className="flex border-l-4 justify-center items-center text-left p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4 font-bold text-red-500">🌐 Social Media</h4>
          <p className="text-gray-300 m-5">Facebook: <a href={user.facebook} className="text-blue-400">{user.facebook}</a></p>
          <p className="text-gray-300 m-5">Twitter: <a href={user.twitter} className="text-blue-400">{user.twitter}</a></p>
          <p className="text-gray-300 m-5">LinkedIn: <a href={user.linkedin} className="text-blue-400">{user.linkedIn}</a></p>
        </div>

        
      </div>

      <p className="text-black transparent">
        hi
      </p>

      <div className=" border-l-4 pl-5 flex flex-col mt-10 p-6 justify-center text-left items-center p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4">
        <h3 className="text-2xl font-bold text-yellow-500">⚙️ Preferences & Settings</h3>
        <p className="m-5"><strong>Notifications:</strong> {user.notifications?.email ? "Email ✅" : "❌"} | {user.notifications?.sms ? "SMS ✅" : "❌"} | {user.notifications?.push ? "Push ✅" : "❌"}</p>
        <p className="m-5"><strong>Language:</strong> {user.language} | <strong>Time Zone:</strong> {user.timezone}</p>
        <p className="m-5"><strong>Linked Accounts:</strong> {user.linkedAccounts?.google ? "Google ✅" : "❌"} | {user.linkedAccounts?.apple ? "Apple ✅" : "❌"} | {user.linkedAccounts?.facebook ? "Facebook ✅" : "❌"}</p>
      </div>

      <p className="text-black transparent">
        hi
      </p>

      <div className="border-l-4 pl-5 flex flex-col mt-10 p-6 justify-center text-left items-center p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4">
        <h3 className="text-2xl font-bold text-green-500">📚 Activity & Engagement</h3>
        <p className="m-5"><strong>Saved Books:</strong> {user.savedBooks?.length || 0} books</p>
        <p className="m-5"><strong>Downloaded Books:</strong> {user.purchaseHistory?.length || 0} books</p>
        <p className="m-5"><strong>Reviews & Ratings:</strong> {user.reviews?.length || 0} reviews</p>
        <p className="m-5"><strong>User Role:</strong> {user.role}</p>
      </div>

      <p className="text-black transparent">
        hi
      </p>

      {/* ✅ Back & Edit Buttons */}
      <div className="border-l-4 pl-5 justify-center items-center text-left p-5 bg-black m-10 rounded-xl shadow-[0_4px_10px_rgba(255,255,255,0.5)] mt-4">
        <button onClick={() => user._id && navigate(`/user/edit/${user._id}`)} className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">
          ✏️ Edit Profile
        </button>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600">
          🔙 Back
        </button>
      </div>
    </div>
  );
};

export default ShowUser;