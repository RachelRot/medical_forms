import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneOrEmail from './PhoneOrEmail';
import EnterCode from './EnterCode';
import Details from './Details';
import FormSelector from './FormSelector';
import DocumentUploader from './DocumentUploader';
import Payment from './Payment';
import SendRequest from './SendRequest';
import SuccessMessage from './SuccessMessage';

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<PhoneOrEmail />} />
        <Route path="/EnterCode" element={<EnterCode />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/FormSelector" element={<FormSelector />} />
        <Route path="/DocumentUploader" element={<DocumentUploader />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sendRequest" element={<SendRequest />} />
        <Route path="/SuccessMessage" element={<SuccessMessage />} />
      </Routes>
  
  );
}

export default App;
