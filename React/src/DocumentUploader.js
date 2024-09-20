import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) { 
      navigate('/Payment');
    } else {
      alert('יש לבחור מסמך!');
    }
  };

  return (
    <div>
      <h2>העלה מסמך</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx" 
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit}>אישור</button>
    </div>
  );
};

export default DocumentUploader;
