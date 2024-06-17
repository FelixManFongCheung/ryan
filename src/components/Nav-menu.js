import React from 'react'
import { Link } from 'react-router-dom';

export default function Nav_menu({desktop_menu, toggleNav}) {

  const handleClick = () => {
    if (toggleNav) {
      toggleNav()
    }
  }; 


  return (
    <ul className={`${desktop_menu || ''} nav-menu`}>
          <li onClick={handleClick}><Link to="/">Home</Link></li>
          <li onClick={handleClick}><Link to="/Works">Works</Link></li>
          <li onClick={handleClick}><Link to="/About">About</Link></li>
          <li onClick={handleClick}><Link to="/Contact">Contact</Link></li>
    </ul>
  )
}
