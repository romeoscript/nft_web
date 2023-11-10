import React from 'react'

import Footer from './Footer'
import Navigation from './Navigation'
const Layout = ({ children }) => {
    return (
        <div className='bg-[#272D37]'>
            <Navigation />
            {children}
            <Footer />
        </div>
    )
}

export default Layout