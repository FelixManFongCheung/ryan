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
          <li className='font-alter' onClick={handleClick}><Link title='Home' to="/">Home</Link></li>
          <li className='font-alter' onClick={handleClick}><Link title='Works' to="/Works">Works</Link></li>
          <li className='font-alter' onClick={handleClick}><Link title='Curatorial Projects' to="/CuratorialProjects">Curatorial Projects</Link></li>
          <li className='font-alter' onClick={handleClick}><Link title='Editions' to="/Editions">Editions</Link></li>
          <li className='font-alter' onClick={handleClick}><Link title='About' to="/About">About</Link></li>
          <li className='font-alter' onClick={handleClick}><Link title='Contact' to="/Contact">Contact</Link></li>
    </ul>
  )
}
