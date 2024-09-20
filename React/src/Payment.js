import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/sendRequest');
        }, 15000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '4rem' }}>
           תשלום
        </div>
    );
};

export default Payment;
