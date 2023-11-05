import React, { useState } from 'react'
import Footer from '../components/Footer';


const Create = () => {

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

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
    return (
        <>
            <div className="text-sm breadcrumbs py-[2rem] px-[4rem]">
                <ul>
                    <li><a>Home</a></li>
                    <li>Add Document</li>
                </ul>
            </div>
            <h2 className='text-center font-bold text-3xl'> Create NFT</h2>
            <section className='flex justify-center items-center flex-cols md:w-[50%] m-auto p-[3rem]'>

                <form action="" className='w-full'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Blockchain <span className='text-[red]'>*</span></span>

                        </label>
                        <select className="select select-bordered">
                            <option disabled selected>Select</option>
                            <option>Ethereum</option>
                            <option>Polygon</option>
                            <option>Zksync Era</option>
                            <option>Arbitrum One</option>
                            <option>Bnb Chain</option>
                        </select>

                    </div>
                    <div className="form-control w-full my-[2rem] ">

                        <label className="label">
                            <span className="label-text">File <span className='text-[red]'>*</span></span>

                        </label>

                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file"
                        />
                        <label
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
                        </label>

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
                            <span className="label-text">NFT name <span className='text-[red]'>*</span></span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Add descriptions to your NFT <span className='text-[red]'>*</span></span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="Description..."></textarea>
                    </div>

                    <div className="form-control w-52 my-[2rem]">
                        <label className="cursor-pointer label">
                            <span className="label-text">Lazy minting </span>
                            <input type="checkbox" className="toggle toggle-primary" checked />
                        </label>
                    </div>

                    <button className="w-full btn btn-wide">Create NFT</button>
                </form>


            </section>
            <Footer />
        </>
    )
}

export default Create