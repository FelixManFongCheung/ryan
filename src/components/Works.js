import React, { useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';
import { useSelector, useDispatch } from 'react-redux';
import { setCollections, setSelectedName, clearImages } from '../redux/collectionsSlice';
import Titles from './Titles';

const Works = ({editionBoolean}) => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const selectedImages = useSelector((state) => state.collections.selectedImages);
  const titleName = useSelector((state) => state.collections.selectedName);
  const checkDescription = useSelector((state) => state.collections.descriptionBoolean);
  const description = useSelector((state) => state.collections.description);


  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch('/.netlify/functions/cloudinaryFetch');
        console.log('requested');
        const data = await response.json();
        dispatch(setCollections(data));
        console.log(data);
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
        </div>
      )}
  
      <div className="gallery">
        {selectedImages.map((image, index) => (   
            <ResponsiveImage key={index} publicId={image.public_id} url={image.url} alt={`${titleName} ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
};

export default Works;
