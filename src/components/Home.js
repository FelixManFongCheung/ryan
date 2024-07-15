import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, setHomeIMG } from '../redux/collectionsSlice'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    margin: '0',
  };
  
  return (
    <LazyLoadImage 
      src={img.url} 
      className='content' 
      alt="ryan's work"
      style={backgroundImageStyle}
      wrapperProps={{
        style: {transitionDelay: "1s"},
      }}
      effect="blur"
    /> 
  )
}
