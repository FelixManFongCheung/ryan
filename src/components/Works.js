import React, { useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';
import { useSelector, useDispatch } from 'react-redux';
import { setCollections, setSelectedName, clearImages, clearState } from '../redux/collectionsSlice';
import Titles from './Titles';

const Works = ({editionBoolean}) => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const selectedImages = useSelector((state) => state.collections.selectedImages);
  const titleName = useSelector((state) => state.collections.selectedName);
  const checkDescription = useSelector((state) => state.collections.descriptionBoolean);
  const description = useSelector((state) => state.collections.description);


  useEffect(() => {
    dispatch(clearState());
    const fetchCollections = async () => {
      const response = await fetch('/.netlify/functions/cloudinaryFetch');
        console.log('requested');
        const data = await response.json();        
        const sortedKeys = Object.keys(data).sort((a, b) => {
          const numA = parseInt(a.split(' ')[0]);
          const numB = parseInt(b.split(' ')[0]);          
          return numA - numB;
        });
        
        const orderedItems = {};
        sortedKeys.forEach(key => {
          const name = key.split(' ').slice(1).join(' ');
          orderedItems[name] = data[key];
        });
        console.log(orderedItems);
        dispatch(setCollections(orderedItems));
    };
    fetchCollections();
  }, [dispatch]);

  const handleChangingTitle = async (title) => {
    dispatch(clearImages());
    dispatch(setSelectedName(title));
  };

  return (
    <div className="work content">
      <Titles collections={collections} titleName={titleName} handleChangingTitle={handleChangingTitle} editionBoolean={editionBoolean} />
      
      {checkDescription && (
        <div className='info'>
          <div className="title">{description.caption}</div>
          <div className="description">{description.alt}</div>
          <div className="dimension">{description.dimension}</div>
        </div>
      )}
  
      <div className="gallery">
        {selectedImages.map((image, index) => (   
            <ResponsiveImage key={index} url={image.url} alt={`${titleName} ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
};

export default Works;
