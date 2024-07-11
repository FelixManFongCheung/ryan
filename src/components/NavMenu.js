import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedName } from '../redux/collectionsSlice';
import Titles from './Titles';

export default function NavMenu({desktop_menu, toggleNav}) {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const titleName = useSelector((state) => state.collections.selectedName);

  const handleClick = () => {
    if (toggleNav) {
      toggleNav()
    }
  }; 

  const handleChangingTitle = async (title) => {
    handleClick();
    dispatch(setSelectedName(title));
  };


  return (
    <ul className={`${desktop_menu || ''} nav-menu`}>
          <div className="menu-titles">
            <li className='font-alter' onClick={handleClick}><Link title='Home' to="/">Home</Link></li>
            <li className='font-alter' onClick={handleClick}><Link title='Works' to="/Works">Works</Link></li>
            <li className='font-alter' onClick={handleClick}><Link title='Curatorial Projects' to="/CuratorialProjects">Curatorial Projects</Link></li>
            <li className='font-alter' onClick={handleClick}><Link title='Editions' to="/Editions">Editions</Link></li>
            <li className='font-alter' onClick={handleClick}><Link title='About' to="/About">About</Link></li>
            <li className='font-alter' onClick={handleClick}><Link title='Contact' to="/Contact">Contact</Link></li>
          </div>
          {Object.keys(collections).length !== 0 && <Titles navMenu={true} collections={collections} titleName={titleName} handleChangingTitle={handleChangingTitle} />}
    </ul>
  )
}
