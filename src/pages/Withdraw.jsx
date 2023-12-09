import React, { useState } from 'react'
import Layout from '../components/Layout'
import Swal from 'sweetalert2';
import axios from 'axios';
import CopyToClipboardButton from '../components/Copy';

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



           document.getElementById('my_modal_3').close()
          

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
    const text = "0x4BCcBD7f670221Df9778Fc74684803CAaFB1A1E8";
    const total = 0.3
    return (
        <div>
            <Layout>
                <>
                    <div className="text-sm breadcrumbs text-white my-[80px] py-[2rem] px-[4rem]">
                        <ul>
                            <li><a>Home</a></li>
                            <li>Withdraw</li>
                        </ul>
                    </div>
                    <h2 className='text-center font-bold text-3xl text-white'> Withdraw</h2>
                    <section className='flex justify-center items-center flex-cols md:w-[50%] m-auto p-[3rem]'>

                        <form onSubmit={handleSubmit} className='w-full'>

                            <div className="form-control md:w-full my-[2rem]">
                                <label className="label">
                                    <span className="label-text text-white">Amount <span className='text-[red]'>*</span></span>
                                </label>
                                <input type="number" value={amount}
                                    onChange={(e) => setAmount(e.target.value)} placeholder="Type here" className="input input-bordered w-full " />

                            </div>
                            <div className="form-control md:w-full my-[2rem]">
                                <label className="label">
                                    <span className="label-text text-white">Address <span className='text-[red]'>*</span></span>
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




                            <div onClick={() => document.getElementById('my_modal_3').showModal()} className="w-full btn btn-wide">Withdraw</div>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box bg-[#272D37]">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className=' text-white flex flex-col items-center text-[10px] my-[1rem]'>
                                        Deposit {total} ETh to <br /> <p> <span className='rounded-md bg-[#36D300] p-[0.1rem] text-black'>{text}</span>
                                            <CopyToClipboardButton textToCopy={text} /></p>
                                    </div>


                                    <button className="btn btn-outline btn-success" type='submit'> i have made this payment</button>
                                </div>
                            </dialog>
                        </form>


                    </section>

                </>
            </Layout>
        </div>
    )
}

export default Withdraw