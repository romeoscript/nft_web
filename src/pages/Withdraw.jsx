import React, { useState } from 'react'
import Layout from '../components/Layout'
import Swal from 'sweetalert2';
import axios from 'axios';

const Withdraw = () => {
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('');
    const token = localStorage.getItem('token')
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Replace with your token if needed
                // Add other headers as required
            };
            const response = await axios.post('https://nftapi-production-405a.up.railway.app/withdraw', {
                amount: parseFloat(amount), // Convert amount to a float
                address
            }, { headers });
            setAmount(0);
            setAddress('');
            Swal.fire({
                title: 'Success!',
                text: 'Withdrawal request submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit withdrawal request.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (
        <div>
            <Layout>
                <>
                    <div className="text-sm breadcrumbs my-[80px] py-[2rem] px-[4rem]">
                        <ul>
                            <li><a>Home</a></li>
                            <li>Withdraw</li>
                        </ul>
                    </div>
                    <h2 className='text-center font-bold text-3xl'> Withdraw</h2>
                    <section className='flex justify-center items-center flex-cols md:w-[50%] m-auto p-[3rem]'>

                        <form onSubmit={handleSubmit} className='w-full'>

                            <div className="form-control md:w-full my-[2rem]">
                                <label className="label">
                                    <span className="label-text">Amount <span className='text-[red]'>*</span></span>
                                </label>
                                <input type="number" value={amount}
                                    onChange={(e) => setAmount(e.target.value)} placeholder="Type here" className="input input-bordered w-full " />

                            </div>
                            <div className="form-control md:w-full my-[2rem]">
                                <label className="label">
                                    <span className="label-text">Address <span className='text-[red]'>*</span></span>
                                </label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        placeholder="Type here"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="input input-bordered w-full pr-10"
                                    />

                                </div>
                            </div>




                            <button type='submit' className="w-full btn btn-wide">Withdraw</button>

                        </form>


                    </section>

                </>
            </Layout>
        </div>
    )
}

export default Withdraw