import React from 'react'
import nft1 from '../assets/nft1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AreaCharts from '../components/ReactCharts';
import Footer from "../components/Footer";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const fetchNFT = async (tokenId) => {
    const response = await fetch(`https://nftapi-production-405a.up.railway.app/nft/${tokenId}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const Detail = () => {
    
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

    // if (isLoading) {
    //     return <Loading />;
    // }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!nft) {
        return <div>NFT not found</div>;
    }
    return (
        <>
            <section className='flex justify-between p-[2rem] my-[3rem]'>
                <div>
                    <img src={nft.image} alt="" className='w-[400px] h-[400px] rounded-md object-cover' />
                </div>
                <div className='basis-[68%]'>
                    <h3 className='font-bold text-3xl capitalize text-white'>{nft.name}</h3>
                    <p className='my-[1rem]'>{nft.description}</p>

                    <span className='capitalize text-gray-500 ' >price Bid</span>
                    <h2 className='my-[0.5rem] mb-[3rem] text-white'>{nft.price} ETH</h2>

                    <button className="btn btn-outline btn-primary"> Purchase Now</button>
                </div>
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
