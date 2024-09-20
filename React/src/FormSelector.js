import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState('');
  const navigate = useNavigate(); 

  const handleFormSelect = (event) => {
    setSelectedForm(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedForm) {
      navigate('/DocumentUploader');
    } else {
      alert('אנא בחר טופס קודם!');
    }
  };

  return (
    <div>
      <h2>איזה טופס נדרש?</h2>
      <div>
        <label>
          <input
            type="radio"
            name="form"
            value="א"
            checked={selectedForm === 'א'}
            onChange={handleFormSelect}
          />
          א
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="form"
            value="ב"
            checked={selectedForm === 'ב'}
            onChange={handleFormSelect}
          />
          ב
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="form"
            value="ג"
            checked={selectedForm === 'ג'}
            onChange={handleFormSelect}
          />
          ג
        </label>
      </div>

      {selectedForm && <p>בחרת בטופס: {selectedForm}</p>}

      <button onClick={handleNavigate}>פ</button>
    </div>
  );
};

export default FormSelector;
