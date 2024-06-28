import React, { useState } from 'react';
import NavMenu from './NavMenu'

export default function NavbarMobile() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
    // <div className='nav-toggle'> - </div>
    <div className='mobo-nav'>
        <div className='toggle-button' onClick={toggleNav}>
            haah
        </div>
        <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={toggleNav}>
        </div>
        <div className={`nav-mobile-wrapper ${isOpen ? 'open' : ''}`}> 
            <NavMenu toggleNav={toggleNav}/>
        </div>
    </div>

  )
}
