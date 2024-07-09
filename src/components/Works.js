import React, { useEffect, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

const Works = () => {
  const [collections, setCollections] = useState({});
  const [images, setImages] = useState([]);
  const [selectedName, setSelectedName] = useState();
  const [checkDescription, setcheckDescription] = useState({});

  useEffect(() => {
    const fetchCollection = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        console.log('requested');
        const data = await response.json();
        console.log(data);
        setCollections(data);
        console.log(collections);
    };
    fetchCollection();
  }, []);

  const findItemByFoldername = (foldername) => {
    return collections[foldername];
  };

  const handleChangingTitle = async (title) => {
    setSelectedName(title); 
    setImages([]);
    const items = findItemByFoldername(title);
    const newImages = items.images
    setImages(newImages);
    setcheckDescription(items.description ?? null);
  };

  return (
    <div className="work content">
      <div className="work-names">
        {Object.entries(collections).map(([foldername, item]) => (
          <span
            key={foldername}
            className={`name-item ${selectedName === foldername ? 'selected' : ''}`}
            onClick={() => handleChangingTitle(foldername)}
          >
            {`Untitled (${foldername})`}
          </span>
        ))}
      </div>
      {checkDescription && (
        <div className='info'>
          <div className="title">{checkDescription.alt}</div>
          <div className="description">{checkDescription.caption}</div>
        </div>
      )}
      <div className="gallery">
        {images.map((image, index) => (   
            <ResponsiveImage key={index} publicId={image.public_id} alt={`${selectedName} ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
};

export default Works;
