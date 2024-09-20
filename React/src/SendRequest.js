import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SendRequest = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/SuccessMessage'); 
        }, 7000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '3rem' }}>
            הבקשה נשלחת
        </div>
    );
};

export default SendRequest;
