import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code) {
        navigate('/PersonalInfo');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, code]);

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div>
      <h1>...מחפש במערכת</h1>
      <p>אנא המתן</p>
      <input 
        type="text" 
        placeholder="הכנס קוד כאן" 
        value={code} 
        onChange={handleInputChange} 
      />
    </div>
  );
}

export default EnterCode;
