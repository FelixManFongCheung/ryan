import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearState } from '../redux/collectionsSlice'; 

export default function Home() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch, location]);
  
  return (
    <div className='content'></div>
  )
}
