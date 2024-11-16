import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the session
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user');  // Endpoint to get user data
        setUser(response.data);
      } catch (err) {
        setError('Unable to fetch user data');
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Handle logout
    axios.get('http://localhost:5000/logout').then(() => {
    });
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
      {user ? (
        <div>
          <h2 className="text-xl font-bold">Welcome, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ProfilePage;
