import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PhoneOrEmail() {
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/EnterCode');
  };

  return (
    
    <div>
      <h1>כניסה באמצעות טלפון או אימייל</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="טלפון או אימייל"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">שלח</button>
      </form>
    </div>
  );
}

export default PhoneOrEmail;
