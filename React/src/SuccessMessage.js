import React from 'react';

const SuccessMessage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>הבקשה נשלחה בהצלחה</h1>
      <p style={styles.message}>נעדכן בקבלת המסמך</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  header: {
    color: '#4CAF50',
    fontSize: '24px',
    marginBottom: '10px',
  },
  message: {
    color: '#555',
    fontSize: '18px',
  },
};

export default SuccessMessage;
