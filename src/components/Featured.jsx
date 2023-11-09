import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'


// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import berry from '../assets/berry.svg'
import fox from '../assets/fox.svg'
import jay from '../assets/jacob.svg'
import mc from '../assets/mccoy.svg'
import wade from '../assets/wade.svg'
import ralph from '../assets/ralph.svg'
import { GoVerified } from 'react-icons/go'

function Featured() {
    const featuredpeoples = [
        {
            name: 'Crispin Berry',
            amount: "214 ETh",
            img: berry
        },
        {
            name: 'Robert Fox',
            amount: "214 ETh",
            img: fox
        },
        {
            name: 'Wade Warren',
            amount: "214 ETh",
            img: wade
        },
        {
            name: 'Ralph Edwards',
            amount: "214 ETh",
            img: ralph
        },
        {
            name: 'Ariene McCoy',
            amount: "214 ETh",
            img: mc
        },
        {
            name: 'Jay Jones',
            amount: "214 ETh",
            img: jay
        },
    ]

    return (
        <>
            <div className='w-full bg-white '>
                <section className='flex items-center w-4/5 m-auto bg-white py-[2rem]'>
                    <Swiper
                        autoplay={{
                            delay: 2500,
                        }}
                        brbreakpoints={{
                            // When the viewport width is >= 320px
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            // When the viewport width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // When the viewport width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }} eak

                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {featuredpeoples.map((people) => {
                            return (
                                <SwiperSlide>

                                    <figure className='flex items-center gap-3'>
                                        <div className="avatar online relative">
                                            <div className="w-20 rounded-full">
                                                <img src={people.img} alt="" className='rounded-full md:h-[60px] h-[40px] md:w-[60px] w-[40px]' />

                                                <span className="absolute bottom-0 right-0 text-[green] rounded-full p-1">
                                                    <GoVerified />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='text-black'>
                                            <p className='font-bold text-xl mb-[0.5rem]'> {people.name}</p>
                                            <p>{people.amount} ETH</p>
                                        </div>
                                    </figure>
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </section>
            </div>
        </>
    );
}
export default Featured