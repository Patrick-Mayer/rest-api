import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUserByID = ({ id }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id !== null) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://142.93.243.224:5000/api/users/${id}`);
          setUser(response.data);

          setError(null);
        } catch (err) {
          setError(err.response ? err.response.data.message : err.message);
          setUser(null);
        }
      };

      fetchUser();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Selected User's Details:</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default GetUserByID;
