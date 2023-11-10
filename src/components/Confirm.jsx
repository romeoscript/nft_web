import React, { useEffect } from 'react';

const ConfirmPurchase = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            confirmPayment(token);
        }
    }, []);
    const tokenss = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6ImRvZUBnbWFpbC5jb20iLCJpYXQiOjE2OTk2NTYwOTZ9.QCPK4ovixpsO9UfH-rSDfwhj8C2F0NLiBIKMsbnbLBI'
    const confirmPayment = async (token) => {
        try {
            const response = await fetch(`https://nftapi-production-405a.up.railway.app/confirm-payment/${token}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenss}`,
                    // Add headers if needed, like 'Content-Type': 'application/json'
                    // If authorization is required, add the appropriate header
                },
                body: JSON.stringify({
                    // Add body data if required by your API
                }),
            });

            if (!response.ok) {
                throw new Error('Payment confirmation failed');
            }

            const data = await response.json();
            console.log('Success:', data);
            // Handle success, maybe update the state to display a success message
        } catch (error) {
            console.error('Error:', error);
            // Handle errors, maybe update the state to display an error message
        }
    };

    return (
        <div>
            <h2>Confirming Purchase...</h2>
            {/* Here you can render success or error messages based on the state */}
        </div>
    );
};

export default ConfirmPurchase;
