import React, {useContext} from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';

const DeleteUsers = () => {
  const {fetchUsers} = useContext(UserContext);
  
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://142.93.243.224:5000/api/users');
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
      alert('Error deleting users');
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete All Users
    </button>
  );
};

export default DeleteUsers;