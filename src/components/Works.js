import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ResponsiveImage from './ResponsiveImage';

const Works = () => {
  const [images, setImages] = useState([]);

  const responsivity = {
    mobile: {
      breakpoint: { max: 2000, min: 0 },
      items: 1
    }
  };


  useEffect(() => {
    const fetchImages = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <Carousel   
      showDots={false}
      responsive={responsivity}
      // centerMode={true}
      className='content'
    >
      {images.map((image, index) => (
        <ResponsiveImage key={image.public_id || index} publicId={image.public_id}/>
      ))}
    </Carousel>
  );
};

export default Works;
