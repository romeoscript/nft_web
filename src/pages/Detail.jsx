import React from 'react'
import nft1 from '../assets/nft1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AreaCharts from '../components/ReactCharts';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CopyToClipboardButton from '../components/Copy';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

const fetchNFT = async (tokenId) => {
    const response = await fetch(`https://nftapi-production-405a.up.railway.app/nft/${tokenId}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const Detail = () => {
    const Navigate = useNavigate()
    const login = () => {
        Navigate("/login")
    }

    const { tokenId } = useParams();

    const {
        data: nft,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryFn: () => fetchNFT(tokenId),
        queryKey: ["nft", tokenId],
        cacheTime: 1000 * 60 * 5, // cache data for 5 minutes
        staleTime: 1000 * 60,
    });

    if (isLoading) {
        return <InfinitySpin
            width='200'
            color="#4fa94d"
        />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!nft) {
        return <div>NFT not found</div>;
    }
    const handlePurchase = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://nftapi-production-405a.up.railway.app/buy/${tokenId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // Include other headers as required, e.g., authorization headers
                },
                body: JSON.stringify({
                    tokenId: tokenId, // Make sure this is the correct payload for your API
                }),
            });

            if (!response.ok) {
                throw new Error('Purchase failed.');
            }
            // Parse JSON response
            const data = await response.json();


            // Show a success notification
            toast.success('Purchase successful!, pending verification');
            if (response.ok) {
                Navigate('/mynft')
            }

        } catch (error) {
            // Show an error notification
            toast.error('Purchase failed: ' + error.message);
        }
    };

    const total = nft.price + (nft.price * 0.25)
    const text = "0x39cb8b97b4c53fcfe2d54ea4bf92be07c55389b8";
    const token = localStorage.getItem('token')
    return (
        <Layout>
            <>

                <section className='md:flex justify-between p-[2rem] my-[3rem]'>
                    <div>
                        <img src={nft.image} alt="" className='md:w-[400px] w-full h-[400px] rounded-md object-cover' />
                    </div>
                    <div className='basis-[68%]'>
                        <h3 className='font-bold text-3xl capitalize text-white'>{nft.name}</h3>
                        <p className='my-[1rem]'>{nft.description}</p>

                        <span className='capitalize text-gray-500 ' >price Bid</span>
                        <h2 className='my-[0.5rem] mb-[3rem] text-white'>{nft.price} ETH</h2>

                        <button className="btn btn-outline btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}> Purchase Now</button>
                    </div>


                    <dialog id="my_modal_3" className="modal ">
                        <div className="modal-box bg-[#272D37]">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className=' text-white flex flex-col items-center text-[8px] my-[1rem]'>
                                Deposit {(total).toFixed(4)}  ETh to <p> <br /> <span className='rounded-md bg-[#36D300] p-[0.1rem] text-black'>{text}</span>
                                    <CopyToClipboardButton textToCopy={text} /></p>
                            </div>
                            <figure className='flex justify-around gap-[3%] items-center'>
                                <div>
                                    <img src={nft.image} alt="" className='w-[100px] h-[100px] rounded-md object-cover' />
                                </div>
                                <div className='basis-[68%]'>
                                    <h3 className='font-bold  capitalize text-white'>{nft.name}</h3>

                                    <p className='capitalize mt-[1rem] text-gray-500 text-[12px] ' >floor price   <span className='my-[0.5rem]  text-white'>{nft.price} ETH</span></p>

                                </div>
                            </figure>
                            <div className='flex items-center gap-20 my-[2rem] text-white capitalize'>
                                <figure>
                                    <span className='block'>Royalty</span>
                                    <span className='block '>Service Fee</span>

                                </figure>
                                <figure>
                                    <span className='block '> 0% </span>
                                    <span className='block'> {25} %</span>
                                </figure>
                            </div>

                            <div className='flex items-center gap-20 my-[2rem] capitalize text-white'>
                                <figure>
                                    <span className='block font-bold text-l'>Total Price</span>


                                </figure>
                                <figure>
                                    <span className='block '>    {(total).toFixed(4)} ETH</span>

                                </figure>
                            </div>
                            {token ? <button className="btn btn-outline btn-success" onClick={handlePurchase}> {isLoading ? <InfinitySpin
                                width='200'
                                color="#4fa94d"
                            /> : 'i have made this payment '}
                            </button> : <button className="btn btn-outline btn-warning" onClick={login}> Login to  Purchase</button>}

                        </div>
                    </dialog>
                </section>

                <section className='w-4/5 m-auto text-white'>
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Price History</Tab>
                        </TabList>

                        <TabPanel>
                            <h2 className='md:w-4/5 my-[2rem] text-gray-400 text-left text-gray-400'>{nft.description}</h2>
                            <div className='flex gap-20 capitalize '>
                                <figure className='text-white text-sm'>
                                    <span className='block font-bold text-grey-400'>contract address</span>
                                    <span className='block my-[1rem] font-bold text-grey-400'>token id </span>
                                    <span className='block font-bold text-grey-400'> blockchain</span>
                                </figure>
                                <figure className='text-gray-400'>
                                    <span className='block  text-grey-400'>{nft.address.substring(0, 4) + '****' + nft.address.substring(nft.address.length - 4)}</span>
                                    <span className='block my-[1rem] text-grey-400'>#{tokenId} </span>
                                    <span className='block text-grey-400'> {nft.blockchain}</span>
                                </figure>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <AreaCharts />
                        </TabPanel>
                    </Tabs>

                    <div>
                        <figure className='flex items-center justify-between text-xl my-[4rem]'>
                            <p> Another NFTS </p>     <button className="btn btn-outline btn-primary block"> Purchase Now</button>
                        </figure>
                        {/* <NftItem img={img1} number={852} price={1} /> */}
                    </div>
                </section>
                <br /> <br /> <br />

            </>
        </Layout>
    )
}

export default Detail
