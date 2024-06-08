import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const UserForm = () => {
    const {fetchUsers} = useContext(UserContext);
    
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name: username,
                email: email,
            });
            console.log('User added:', response.data);
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
        
        setUsername('');
        setEmail('');
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                className="form-control"
                placeholder="Enter your Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                className="form-control"
                placeholder="Enter your Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;