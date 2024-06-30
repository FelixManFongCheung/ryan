import React, { useEffect, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

const Works = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="content">
      {images.map((image, index) => (
        <div className='image-wrapper' key={image.public_id || index}>
          <ResponsiveImage publicId={image.public_id}/>
          <h2>{image.title}</h2>
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Works;
