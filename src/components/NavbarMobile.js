import React, { useState } from 'react';
import Nav_menu from './NavMenu'

export default function NavbarMobile() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
    // <div className='nav-toggle'> - </div>
    <div className='mobo-nav'>
        {/* <div className='nav-mobo-toggle'>x</div> */}
        <div className='toggle-button' onClick={toggleNav}>
            haah
        </div>
        <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
            <div className='nav-mobile-wrapper'> 
                <div className='nav-mobo-closebtn' onClick={toggleNav}>x</div>
                <Nav_menu toggleNav={toggleNav}/>
            </div>
        </div>
    </div>

  )
}
