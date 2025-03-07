import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    const shouldShowFade = localStorage.getItem('showWelcomeFade') === 'true';
    setShowOverlay(shouldShowFade);

    if (shouldShowFade) {
      // Start fade in animation
      setTimeout(() => {
        setFadeIn(true);
        // Remove overlay after animation completes
        setTimeout(() => {
          setShowOverlay(false);
          localStorage.removeItem('showWelcomeFade'); // Remove the flag
        }, 1000);
      }, 100);
    }

    const fetchProfile = async () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        navigate("/signin");
        return;
      }

      try {
        const user = JSON.parse(userData);
        setUser(user);
        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          location: user.location || "",
        });
      } catch (err) {
        console.error("Error parsing user data:", err);
        localStorage.removeItem("user");
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just update the local state
      setUser({ ...user, ...formData });
      localStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Create a preview URL for immediate display
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);

        // Here you would typically upload the image to your backend
        // const formData = new FormData();
        // formData.append('profile_picture', file);
        // await axios.post('http://localhost:8000/appuser/upload-profile-picture/', formData);
        
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* White overlay that fades out */}
      {showOverlay && (
        <div className={`absolute inset-0 bg-white transition-opacity duration-1000 ${fadeIn ? 'opacity-0' : 'opacity-100'} z-50`} />
      )}
      
      {/* Main content */}
      <div className="w-full max-w-full mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div 
              onClick={handleImageClick}
              className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer relative group overflow-hidden"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl text-gray-500">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Change Photo</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {formData.name || user?.email || "User"}
              </h2>
              <p className="text-gray-600">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">About</h3>
                <p className="mt-1 text-gray-600">{formData.bio || "No bio yet"}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <p className="mt-1 text-gray-600">{formData.location || "Not specified"}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Sections */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-50 rounded-md">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-50 rounded-md">
                Notification Preferences
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-50 rounded-md">
                Privacy Settings
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">No recent activity to show</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
