import React, { useState } from 'react';

const Modal = ({ show, handleClose, handleSubmit }) => {
  const [friendEmail, setFriendEmail] = useState('');

  const handleEmailChange = (e) => {
    setFriendEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(friendEmail);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2 id="ModalText">Have a friend you want to register?</h2>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter friend's email"
            value={friendEmail}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
