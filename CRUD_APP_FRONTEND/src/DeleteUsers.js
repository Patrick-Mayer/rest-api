import React from 'react';
import axios from 'axios';

const DeleteUsers = () => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/users');
      alert(response.data.message);
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