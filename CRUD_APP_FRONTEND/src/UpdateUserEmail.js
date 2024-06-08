import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const UpdateUserEmail = () => {
  const {fetchUsers} = useContext(UserContext);
  
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, { email });
      setMessage(response.data.message);
      fetchUsers();
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error updating user email');
    }
  };

  return (
    <div>
      <h2>Update User Email</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Email</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUserEmail;
