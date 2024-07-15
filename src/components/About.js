import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, setAbout } from '../redux/collectionsSlice'; 


export default function About() {
  const location = useLocation();
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.collections.about);


  useEffect(() => {
    const fetchAbout = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        dispatch(setAbout(data));
    };
    fetchAbout();
    dispatch(clearState());
  }, [dispatch, location]);

  return (
    <div className='content name'>
      {abouts.map((about, index) => (
        <>
        <div key={index} dangerouslySetInnerHTML={{ __html: about.default_value }}>
        </div>
        <br />
        </>
      ))}

    </div>
  )
}
