import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CopyToClipboardButton from '../components/Copy';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
const Create = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [blockchain, setBlockchain] = useState('Ethereum');
    const [nftName, setNftName] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        // Append the form data
        formData.append('blockchain', blockchain);
        formData.append('name', nftName);
        formData.append('description', description);
        if (file) {
            formData.append('image', file);
        }
        console.log(formData);
        try {
            const response = await fetch(`https://nftapi-production-405a.up.railway.app/creatNft`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // We send formData directly
            });

            if (!response.ok) {
                throw new Error('Failed to create NFT.');
            }

            const data = await response.json();
            // Show success alert using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'NFT created successfully!, verification pending',
                showConfirmButton: false,
                timer: 1500
            });

            setFile(null);
            setPreviewUrl('');
            setBlockchain('');
            setNftName('');
            setDescription('');

            // Handle success, perhaps navigate to a new page or clear the form
            console.log('NFT created:', data);
            // Reset form or show success message
            navigate('/mynft');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Creation failed: ' + error.message,
            });
            // Handle error, show error message to user
            console.error('Creation failed:', error);
        }
    };

    const text = "0x39cb8b97b4c53fcfe2d54ea4bf92be07c55389b8";
    const total = 0.2
    return (
        <Layout>

            <div className="text-sm breadcrumbs py-[2rem] px-[4rem] mt-[70px]">
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/">
                            Home
                        </Link>

                        <Typography color="text.primary">create</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <h2 className='text-center font-bold text-3xl text-white'> Create NFT</h2>
            <section className='flex justify-center items-center flex-cols md:w-[50%] m-auto p-[3rem]'>

                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-white">Blockchain <span className='text-[red]'>*</span></span>

                        </label>
                        <select className="select select-bordered" value={blockchain}
                            onChange={(e) => setBlockchain(e.target.value)}>
                            {/* <option disabled selected>Select</option> */}
                            <option value="Ethereum">Ethereum</option>
                            <option value="Polygon">Polygon</option>
                            <option value="Zksync Era">Zksync Era</option>
                            <option value="Arbitrum One">Arbitrum One</option>
                            <option value="Bnb Chain">Bnb Chain</option>
                        </select>

                    </div>
                    <div className="form-control w-full my-[2rem] ">

                        <label className="label">
                            <span className="label-text text-white">File <span className='text-[red]'>*</span></span>

                        </label>

                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file"
                            name='image'
                            accept='image/*'
                        />
                        {file ? <label htmlFor="file" className="block">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-64 h-64 object-cover border rounded-lg cursor-pointer"
                            />
                        </label> : <label
                            htmlFor="file"
                            className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-100 hover:text-white"
                        >

                            <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M16.7,5.3l-1.9-2c-0.2-0.2-0.5-0.3-0.7-0.3H6c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V6C15,5.7,15.9,5.5,16.7,5.3z M14,7v2h-4V7H14z M14,13v2h-4v-2H14z M10,7v2H6V7H10z M10,13v2H6v-2H10z" />
                            </svg>
                            <span className="mt-2 text-base leading-normal">Select a file</span>
                        </label>}

                        {/* {file && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700">
                                    {file.name}
                                </p>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="mt-4 h-48 w-auto border rounded"
                                    />
                                )}
                            </div>
                        )} */}
                    </div>
                    <div className="form-control md:w-full my-[2rem]">
                        <label className="label">
                            <span className="label-text text-white">NFT name <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" placeholder="Type here" value={nftName}
                            onChange={(e) => setNftName(e.target.value)}
                            className="input input-bordered w-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-white">Add descriptions to your NFT <span className='text-[red]'>*</span></span>
                        </label>
                        <textarea className="textarea textarea-bordered" value={description}
                            onChange={(e) => setDescription(e.target.value)} placeholder="Description..."></textarea>
                    </div>

                    <div className="form-control w-52 my-[2rem]">
                        <label className="cursor-pointer label">
                            <span className="label-text text-white">Lazy minting </span>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                        </label>
                    </div>

                    <div className="w-full btn btn-wide" onClick={() => document.getElementById('my_modal_3').showModal()}>Create NFT</div>

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
        </Layout>
    )
}

export default Create