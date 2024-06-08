import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import logo from '../logo.svg';
import logo from '../logo.png';
import UserForm from '../UserForm';
import UserList from '../UserList';
import UserSelector from '../UserSelector';
import DeleteUsers from '../DeleteUsers';
import UpdateUserEmail from '../UpdateUserEmail';
import Modal from '../Modal';


function Home(){
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (friendEmail) => {
        try {
        await axios.put('http://localhost:5000/api/users', { email: friendEmail });
        console.log(`Friend's email submitted: ${friendEmail}`);
        
        } catch (error) {
        console.error('Error registering new user:', error.response ? error.response.data : error.message);
        }
        handleCloseModal();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          handleOpenModal();
        }, 1250);
    
        return () => clearTimeout(timer);
      }, []);
    
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>

                <button id="myBtn" onClick={handleOpenModal}>Open Modal</button>

                <Modal show={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} />

                <div>
                    <UserSelector />
                </div>
                
                <UpdateUserEmail></UpdateUserEmail>
                <UserForm></UserForm>
                <UserList></UserList>
                <DeleteUsers></DeleteUsers>
                
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </div>
    )
}

export default Home;