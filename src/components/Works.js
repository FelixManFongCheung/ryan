import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Works = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/.netlify/functions/cloudinary_fetch');
        console.log(response);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Dynamic Image Gallery</h1>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={`${image.secure_url}?f_auto,q_auto`}
            alt={image.public_id}
            style={{ width: '300px', height: 'auto' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Works;
