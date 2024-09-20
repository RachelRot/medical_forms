import React, { useState } from 'react';

const Details = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    treatmentDate: '',
    treatmentLocation: '',
    medicalInstitution: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // כאן אשלח מידע לשרת
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>ID Number:</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Treatment Date:</label>
        <input
          type="date"
          name="treatmentDate"
          value={formData.treatmentDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Treatment Location:</label>
        <input
          type="text"
          name="treatmentLocation"
          value={formData.treatmentLocation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Medical Institution:</label>
        <input
          type="text"
          name="medicalInstitution"
          value={formData.medicalInstitution}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Details;
