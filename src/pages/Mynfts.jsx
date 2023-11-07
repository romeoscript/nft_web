import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { MdVerified } from 'react-icons/md'
import Navbar from '../components/Navbar'

const Mynfts = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log(data);
                setNfts(data); // Set the NFTs in state
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
    return (
        <div>
            <Navbar />
            <div className="text-sm breadcrumbs py-[2rem] md:px-[4rem] px-[1rem]">
                <ul>
                    <li><a>Home</a></li>
                    <li>My Nfts</li>
                </ul>

                <h2 className='text-center font-bold text-3xl capitalize my-[3rem]'>All collections</h2>

                <figure className='my-[2rem] grid md:grid-cols-3  grid-cols-2'>
                    {nfts.map(nft => {
                        return (
                            <div className="card md:w-[200px] w-[180px] h-[300px] glass my-[1rem]" key={nft.id}>
                                <figure><img src={nft.image} alt="car!" /></figure>
                                <div className="card-body p-[0.5rem]">
                                    <h2 className="card-title text-sm">{nft.name} <span className='text-[green]'><MdVerified /></span></h2>
                                    <p>{nft.description ? nft.description.substring(0, 40) + '...' : ''}</p>
                                    <div className="card-actions justify-end w-full">
                                        <button className="btn btn-primary w-full h-3/5">List For Sale</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </figure>
            </div>
            <Footer />
        </div>
    )
}

export default Mynfts