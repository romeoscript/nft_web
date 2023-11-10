import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmPurchase = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            confirmPayment(token);
        }
    }, []);

    const tokenss = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6ImRvZUBnbWFpbC5jb20iLCJpYXQiOjE2OTk2NDM5NDZ9.xN4zzCDNF0dD8Hi7B-3anQf5oPcuSMemiKPL9lTfD8A'; // Replace with your actual token

    const confirmPayment = async (token) => {
        try {
            const response = await fetch(`https://nftapi-production-405a.up.railway.app/confirm_pay/${token}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenss}`,
                    // Additional headers if needed
                },
                body: JSON.stringify({
                    // Add body data if required by your API
                }),
            });

            if (!response.ok) {
                throw new Error('Payment confirmation failed');
            }

            const data = await response.json();
            toast.success('Success: Payment confirmed!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Confirming Purchase...</h2>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default ConfirmPurchase;
