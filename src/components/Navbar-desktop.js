import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar_desktop() {
    return (
      <ul className='nav-desktop'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Works">Works</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
      </ul>
  
    )
}