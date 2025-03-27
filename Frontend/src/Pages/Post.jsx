import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt ,AiOutlineMore } from "react-icons/ai";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionUser, setSessionUser] = useState(null); // Store logged-in user info
  const [showMenu, setShowMenu] = useState(null);
  useEffect(() => {
    fetchSessionUser();
    fetchPosts();
  }, []);

  const fetchSessionUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/session", { withCredentials: true });
      setSessionUser(res.data); // Store session user data
    } catch (error) {
      console.error("Error fetching session:", error.message);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/share");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
    setLoading(false);
  };

  const handleMenuToggle = (postId) => {
    if (showMenu === postId) {
      setShowMenu(null); // Close the menu if the same post is clicked
    } else {
      setShowMenu(postId); // Open menu for the clicked post
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-8">
        
        {/* ✅ Display Logged-in Username & Profile Image */}
        {sessionUser && (
          <div className="flex items-center justify-between space-x-4 mb-4 bg-gray-900 text-orange-400 py-3 rounded-md shadow-lg m-10">
            <img
              src={sessionUser.image ? sessionUser.image : "https://via.placeholder.com/50"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-orange-500"
            />

            <p className="text-lg font-bold dosis-regular">
              {sessionUser.username} 🎉
            </p>
          </div>
          
        )}
        <div>
          
        </div>

        <div>
         <Link to="/addPost">
            <button className="border-2 mr-10 my-4 p-3 w-full text dosis-regular rounded-xl border-orange-500 text-gray-500">
              What is on your mind ...
            </button>
         </Link >
          
        </div>

        <h2 className="text-3xl playwrite bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-bold mb-4">
          Recent Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-4 rounded-lg shadow-md mb-4 bg-gradient-to-r from-gray-800 to-black shadow-lg shadow-[rgba(255,255,255,0.5)]"
            >
              <div className="flex items-center space-x-3">
              {post.image && (
                  <img
                    src={`http://localhost:3000${post.image}`} // Ensure the correct path
                    alt="Post"
                    className="w-10 h-10 rounded-full"
                    width={200}
                  />
              )}

                
                
                
                <div className="flex justify-between  w-full">
                  <div>
                    <p className="dosis-regular font-bold text-2xl">{post.post_man || "Unknown User"}</p>
                    <p className="text-sm text-yellow-500">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="relative m-4">
                      {/* Three-Dot Menu Icon */}
                      <button
                        onClick={() => handleMenuToggle(post._id)} // ✅ Added onClick event
                        className="text-white hover:text-orange-500"
                      >
                        <AiOutlineMore size={30} />
                      </button>

                      {/* Dropdown Menu */}
                      {showMenu === post._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-700 text-white rounded-lg shadow-lg">
                          <Link to="/EditPost">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-600"
                              onClick={() => console.log("Edit post", post._id)}
                            >
                              Edit
                            </button>
                          </Link>

                          <Link to="/DeletePost">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-600"
                              onClick={() => console.log("Delete post", post._id)}
                            >
                              Delete
                            </button>
                          </Link>

                        </div>
                      )}
                  </div>

                </div>
              </div>

              <p className="mt-3 text-gray-300 py-5">{post.post_Desc}</p>

              {post.image && (
                  <img
                    src={`http://localhost:3000${post.image}`} // Ensure the correct path
                    alt="Post"
                    className="w-full m- p-12 rounded-lg"
                    width={200}
                  />
              )}

              <div className="flex justify-between mt-4 text-gray-600">
                <button className="flex text-orange-500 items-center space-x-2 hover:text-yellow-500">
                  <AiOutlineLike size={20} /> <span>Like</span>
                </button>
                <button className="flex text-orange-500 items-center space-x-2 hover:text-yellow-500">
                  <AiOutlineComment size={20} /> <span>Comment</span>
                </button>
                <button className="flex text-orange-500 items-center space-x-2 hover:text-yellow-500">
                  <AiOutlineShareAlt size={20} /> <span>Share</span>
                </button>
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RecentPosts;
