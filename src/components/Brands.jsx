import React from 'react'
import metamask from '../assets/metamask.svg'
import binance from '../assets/binance.svg'
import coinbase from '../assets/coinbase.svg'
import toko from '../assets/toko.svg'

const Brands = () => {
    return (
        <div className='grid grid-cols-4 place-items-center py-[2rem] bg-[#0F182E]'>
            <div>
                <img src={metamask} alt="" />
            </div>
            <div>
                <img src={binance} alt="" />
            </div>
            <div>
                <img src={coinbase} alt="" />
            </div>
            <div>
                <img src={toko} alt="" />
            </div>
        </div>
    )
}

export default Brands