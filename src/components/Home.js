import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, setHomeIMG } from '../redux/collectionsSlice'; 

export default function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const img = useSelector((state) => state.collections.homeIMG);



  useEffect(() => {
    const fetchIMG = async () => {
      const response = await fetch('/.netlify/functions/cloudinaryFetch');
      const data = await response.json();        
      dispatch(setHomeIMG(data));
    };
    fetchIMG(); 
    dispatch(clearState());
  }, [dispatch, location]);

  const backgroundImageStyle = {
    backgroundImage: `url(${img.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    marginTop: '0',
  };
  
  return (
    <div className='content' style={backgroundImageStyle}>
    </div>
  )
}
