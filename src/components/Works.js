import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

// cards.map(card => (
//   <img loading="lazy" src={SportImages[card.image_ref]} />
// ))
export default function Works() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item></Carousel.Item>
    </Carousel> 

  )
}


