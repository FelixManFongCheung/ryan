import React, { useEffect, useState } from 'react';

export default function About() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setAbout(data);
    };
    fetchAbout();
  }, []);

  return (
    <div className='content name'>
      {about.external_id}
      {about.default_value}
    </div>
  )
}
