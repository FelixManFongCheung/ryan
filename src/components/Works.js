import React, { useEffect, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

const Works = () => {
  const [collections, setCollections] = useState([]);
  const [selectedName, setSelectedName] = useState();

  useEffect(() => {
    const fetchCollection = async () => {
        const response = await fetch('/.netlify/functions/cloudinaryFetch');
        const data = await response.json();
        console.log(data);
        setCollections(data);
    };
    fetchCollection();
  }, []);

  return (
    <div className="content">
      <div className="work-names">
        {collections.map((collection, index) => (
          <span
            key={collection.folderName}
            className={`name-item ${selectedName === collection.folderName ? 'selected' : ''}`}
            onClick={() => setSelectedName(collection.folderName)}
          >
            {collection.folderName}
          </span>
        ))}
      </div>
      <div className="gallery">
        {collections.find(collection => collection.folderName === selectedName)?.images.map((image, index) => (
          <div key={index}>
            <div className="image-wrapper">
              <ResponsiveImage publicId={image.public_id} alt={`${selectedName} ${index + 1}`}/>
            </div>
            <h2>{image.title}</h2>
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
