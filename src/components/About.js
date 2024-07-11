import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearState } from '../redux/collectionsSlice'; 


export default function About() {
  const [about, setAbout] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAbout = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setAbout(data);
    };
    fetchAbout();
    dispatch(clearState());
  }, [dispatch, location]);

  return (
    <div className='content name'>
      {about.external_id}
      {about.default_value}
    </div>
  )
}
