import React from 'react';
import './LoginModal.css'; // Import the CSS file for styling

function LoginModal({ login }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login Required</h2>
        <p>Please log in to access the content.</p>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default LoginModal;
