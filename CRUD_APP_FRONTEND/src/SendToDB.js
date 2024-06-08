//outdated

import React, { useState } from 'react';
import axios from 'axios';

const SendToDB = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                name,
                email,
            });

            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="text"
                className="form-control"
                placeholder="Enter new username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                className="form-control"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SendToDB;
