import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



const ResponsiveImage = ({ url }) => {
  const intrinsicWidth = 1000;
  const correctedURL = url.replace('/upload/', `/upload/w_${intrinsicWidth},c_scale,q_auto:best/`);

  return (
    <LazyLoadImage 
      src={correctedURL} 
      className='gallery-image image-fade' 
      alt="ryan's work"
      wrapperProps={{
        style: {transitionDelay: "1s"},
      }}
      effect="blur"
    />
  );
};

export default ResponsiveImage;
