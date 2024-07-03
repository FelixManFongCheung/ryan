import React from 'react';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { format } from '@cloudinary/url-gen/actions/delivery';



const ResponsiveImage = ({ publicId }) => {
  // Create a CloudinaryImage instance
  const image = new CloudinaryImage(publicId, { cloudName: process.env.REACT_APP_CLOUDINARY_NAME });
  
  image.resize(fill().width(1000)).delivery(quality('auto:best')).delivery(format('auto'))

  return (
    <AdvancedImage
      cldImg={image}
      plugins={[lazyload()]}
      loading='lazy'
    />
  );
};

export default ResponsiveImage;
