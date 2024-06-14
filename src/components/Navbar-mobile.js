import React, { useState } from 'react';

export default function Navbar_mobile() {

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
            <div className="nav-menu"> 
                <div className='nav-mobo-closebtn' onClick={toggleNav}>x</div>
                dfsjhbv,jbfnd
            </div>
        </div>
    </div>

  )
}
