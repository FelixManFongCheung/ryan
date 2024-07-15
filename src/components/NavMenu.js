import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedName } from '../redux/collectionsSlice';
import Titles from './Titles';
import { useMatch } from 'react-router-dom';


export default function NavMenu({desktop_menu, toggleNav}) {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const titleName = useSelector((state) => state.collections.selectedName);
  const match = useMatch("/Editions");

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
    <div className={`${desktop_menu || ''} nav-menu`}>
          <div className="menu-titles">
            <div className='font-alter' onClick={handleClick}><Link title='Home' to="/">Home</Link></div>
            <div className='font-alter' onClick={handleClick}><Link title='Works' to="/Works">Works</Link></div>
            <div className='font-alter' onClick={handleClick}><Link title='Curatorial Projects' to="/CuratorialProjects">Curatorial Projects</Link></div>
            <div className='font-alter' onClick={handleClick}><Link title='Editions' to="/Editions">Editions</Link></div>
            <div className='font-alter' onClick={handleClick}><Link title='About' to="/About">About</Link></div>
            <div className='font-alter' onClick={handleClick}><Link title='Contact' to="/Contact">Contact</Link></div>
          </div>
          {Object.keys(collections).length !== 0 && <Titles navMenu={true} collections={collections} titleName={titleName} handleChangingTitle={handleChangingTitle} editionBoolean={match && true} />}
    </div>
  )
}
