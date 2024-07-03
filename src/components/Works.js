import React, { useEffect, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

const Works = () => {
  const [collections, setCollections] = useState([]);
  const [selectedName, setSelectedName] = useState();

  useEffect(() => {
    const fetchCollection = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        setCollections(data);
    };
    fetchCollection();
  }, []);

  return (
    <div className="work content">
      <div className="work-names">
        {collections.map((collection, index) => (
          <span
            key={collection.folderName}
            className={`name-item ${selectedName === collection.folderName ? 'selected' : ''}`}
            onClick={() => setSelectedName(collection.folderName)}
          >
            {`Untitled (${collection.folderName})`}
          </span>
        ))}
      </div>
      <div className="gallery">
        {collections.find(collection => collection.folderName === selectedName)?.images.map((image, index) => (   
            <ResponsiveImage key={index} publicId={image.public_id} alt={`${selectedName} ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
};

export default Works;
