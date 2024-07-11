import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearState } from '../redux/collectionsSlice'; 

export default function Contact() {
  const [instagram, setInstagram] = useState();
  const [email, setEmail] = useState();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContact = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setInstagram(data.instagram.default_value);
        setEmail(data.email.default_value);
    };
    fetchContact();
    dispatch(clearState());
  }, [dispatch, location]);
  
  return (
    <div className='content'>
      <a href='https://www.instagram.com/ryanmoyii_' target="_blank" rel="noreferrer" className="instagram">{instagram}</a >
      <div className="email">{email}</div>
    </div>
  )
}
