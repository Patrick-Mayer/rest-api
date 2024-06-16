import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';



const DeleteByID = ({userId}) => {
  const [message, setMessage] = useState('');
  const {fetchUsers} = useContext(UserContext);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://142.93.243.224:5000/api/users/${userId}`);
      alert(response.data.message);
      fetchUsers();
      
    } catch (error) {
      alert(error.response ? error.response.data.error : 'Error deleting user');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteByID;
