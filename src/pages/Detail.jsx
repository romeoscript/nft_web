import React from 'react'
import nft1 from '../assets/nft1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AreaCharts from '../components/ReactCharts';
import Footer from "../components/Footer";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CopyToClipboardButton from '../components/Copy';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
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
        <>
            {token && <Navbar />}
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

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className=' text-white flex flex-col items-center text-[10px] my-[1rem]'>
                            Deposit {total} ETh to <p> <span className='rounded-md bg-[#36D300] p-[0.1rem] text-black'>{text}</span>
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
                        <div className='flex items-center gap-20 my-[2rem] capitalize'>
                            <figure>
                                <span className='block'>Royalty</span>
                                <span className='block '>Service Fee</span>

                            </figure>
                            <figure>
                                <span className='block '> 0% </span>
                                <span className='block'> {25} %</span>
                            </figure>
                        </div>

                        <div className='flex items-center gap-20 my-[2rem] capitalize'>
                            <figure>
                                <span className='block font-bold text-xl'>Total Price</span>


                            </figure>
                            <figure>
                                <span className='block '> {total}  ETH</span>

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

            <section className='w-4/5 m-auto'>
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Price History</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className='w-4/5 my-[2rem]'>{nft.description}</h2>
                        <div className='flex gap-20 capitalize'>
                            <figure>
                                <span className='block'>contract address</span>
                                <span className='block my-[1rem]'>token id </span>
                                <span className='block'> blockchain</span>
                            </figure>
                            <figure>
                                <span className='block'>{nft.address}</span>
                                <span className='block my-[1rem]'>#{tokenId} </span>
                                <span className='block'> {nft.blockchain}</span>
                            </figure>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <AreaCharts />
                    </TabPanel>
                </Tabs>

                <div>
                    <figure className='flex items-center justify-between text-3xl m-[4rem]'>
                        <p> Another NFTS </p>     <button className="btn btn-outline btn-primary"> Purchase Now</button>
                    </figure>
                    {/* <NftItem img={img1} number={852} price={1} /> */}
                </div>
            </section>
            <br /> <br /> <br />
            <Footer />
        </>
    )
}

export default Detail
