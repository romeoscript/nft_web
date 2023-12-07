import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdVerified } from 'react-icons/md'
import CopyToClipboardButton from '../components/Copy'
import Layout from '../components/Layout'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const Mynfts = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const fetchMyNFTs = async () => {
            try {
                // Retrieve the access token from local storage
                const accessToken = localStorage.getItem('token');

                // If the token is not found, you can handle it accordingly (e.g., redirect to login)
                if (!accessToken) {
                    throw new Error('Access token not found');
                }

                // Set the Authorization header with the bearer token
                const response = await fetch('https://nftapi-production-405a.up.railway.app/mynfts', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setNfts(data.filter(nft => nft.isPaid));
            } catch (e) {
                setError(e.message); // Set any error that occurred
            } finally {
                setIsLoading(false); // Set loading to false when the request is complete
            }
        };

        fetchMyNFTs();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const text = "0x8dfb83152168e645f4570961B8017c903C32c3c9";
    return (
        <Layout>
            <div className='text-white mt-[70px]'>

                <div className="hero min-h-[20vh] relative" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content absolute bottom-[-40%] left-0">
                        <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="w-[70px] h-[70px] object-cover rounded-lg shadow-2xl rounded-[100%]" />
                        <div className='  items-center text-[9px] my-[1rem]'>
                            <p> <span className='rounded-md bg-[#36D300] p-[0.1rem] text-black'>{text}</span>
                                <CopyToClipboardButton textToCopy={text} /></p>
                        </div>
                    </div>
                </div>

                <div className="text-sm breadcrumbs py-[2rem] mt-[3rem] md:px-[4rem]  px-[1rem]">
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" to="/">
                                Home
                            </Link>

                            <Typography color="text.primary">My Nfts</Typography>
                        </Breadcrumbs>
                    </div>

                    <h2 className='text-center font-bold text-3xl capitalize my-[3rem]'>All collections</h2>

                    <figure className='my-[2rem] grid md:grid-cols-3  grid-cols-2'>
                        {nfts.map(nft => {
                            return (
                                <div className="card md:w-[200px] w-[180px] h-[300px] glass my-[1rem]" key={nft.id}>
                                    <figure className='h-[300px]'><img src={nft.image} alt="car!" className=' h-full object-cover w-full' /></figure>
                                    <div className="card-body p-[0.5rem]">
                                        <h2 className="card-title text-sm">{nft.name} <span className='text-[green]'><MdVerified /></span></h2>
                                        <p>{nft.description ? nft.description.substring(0, 20) + '...' : ''}</p>
                                        <div className="card-actions justify-end w-full">
                                            <button className="btn btn-primary w-full h-3/5">List For Sale</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </figure>
                </div>

            </div>
        </Layout>
    )
}

export default Mynfts