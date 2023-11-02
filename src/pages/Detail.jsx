import React from 'react'
import nft1 from '../assets/nft1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AreaCharts from '../components/ReactCharts';
import Footer from "../components/Footer";
import img1 from "../assets/Nfts/bighead.svg";
import NftItem from '../components/sections/NFT';


const Detail = () => {
    return (
        <>
            <section className='flex justify-between p-[2rem] my-[3rem]'>
                <div>
                    <img src={nft1} alt="" className='w-[400px] h-[400px] rounded-md object-cover' />
                </div>
                <div className='basis-[68%]'>
                    <h3 className='font-bold text-3xl capitalize text-white'>#1119 seagull</h3>
                    <p className='my-[1rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam delectus debitis incidunt unde quae dolor ipsa aut esse cum optio.</p>

                    <span className='capitalize text-gray-500 ' >price Bid</span>
                    <h2 className='my-[0.5rem] mb-[3rem] text-white'>10.89ETH</h2>

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
                        <h2 className='w-4/5 my-[2rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quasi, amet officia distinctio quod beatae fuga voluptates quisquam consequatur maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam consequuntur provident. Reiciendis facere, quo natus molestias debitis quam dolorum.</h2>
                        <div className='flex gap-20 capitalize'>
                            <figure>
                                <span className='block'>contract address</span>
                                <span className='block my-[1rem]'>token id </span>
                                <span className='block'> blockchain</span>
                            </figure>
                            <figure>
                                <span className='block'>contract address</span>
                                <span className='block my-[1rem]'>token id </span>
                                <span className='block'> blockchain</span>
                            </figure>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        isisisi
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