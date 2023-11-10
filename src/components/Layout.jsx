import React, { useEffect } from 'react'

import Footer from './Footer'
import Navigation from './Navigation'
const Layout = ({ children }) => {
    useEffect(() => {
        // Create a script element
        const script = document.createElement('script');
        script.src = "//code.jivosite.com/widget/cWCU9Aowxg";
        script.async = true;

        // Append the script to the body
        document.body.appendChild(script);

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className='bg-[#272D37]'>
            <Navigation />
            {children}
            <Footer />
        </div>
    )
}

export default Layout