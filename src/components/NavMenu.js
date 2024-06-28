import React from 'react'
import { Link } from 'react-router-dom';

export default function NavMenu({desktop_menu, toggleNav}) {

  const handleClick = () => {
    if (toggleNav) {
      toggleNav()
    }
  }; 


  return (
    <ul className={`${desktop_menu || ''} nav-menu`}>
          <li className='font-alter' onClick={handleClick}><Link to="/">Home</Link></li>
          <li className='font-alter' onClick={handleClick}><Link to="/Works">Works</Link></li>
          <li className='font-alter' onClick={handleClick}><Link to="/About">About</Link></li>
          <li className='font-alter' onClick={handleClick}><Link to="/Contact">Contact</Link></li>
    </ul>
  )
}
