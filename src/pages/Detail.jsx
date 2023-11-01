import React from 'react'
import nft1 from '../assets/nft1.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Detail = () => {
    return (
        <>
            <section className='flex justify-between p-[2rem]'>
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
                        <Tab>Title 2</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quasi, amet officia distinctio quod beatae fuga voluptates quisquam consequatur maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam consequuntur provident. Reiciendis facere, quo natus molestias debitis quam dolorum.</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </section>

        </>
    )
}

export default Detail