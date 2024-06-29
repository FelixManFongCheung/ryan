import React, { useEffect, useState } from 'react';

export default function Contact() {
  const [instagram, setInstagram] = useState([]);
  const [email, setEmail] = useState([]);

  useEffect(() => {
    const fetchContact = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        // setInstagram(data.instagram.default_value);
        // setEmail(data.email.default_value);
        console.log('render');
    };
    fetchContact();
  }, []);

  return (
    <div className='content'>
      {/* <div className="instagram">{instagram}</div>
      <div className="email">{email}</div> */}
    </div>
  )
}
