'use client';

import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useCollectionsStore } from '@/lib/store';
import type { HomeImage } from '@/lib/types';

export default function Home() {
  const homeIMG = useCollectionsStore((state) => state.homeIMG);
  const setHomeIMG = useCollectionsStore((state) => state.setHomeIMG);
  const clearState = useCollectionsStore((state) => state.clearState);

  useEffect(() => {
    const fetchIMG = async () => {
      const response = await fetch('/api/cloudinary/home');
      const data = (await response.json()) as HomeImage;
      setHomeIMG(data);
    };
    fetchIMG();
    clearState();
  }, [clearState, setHomeIMG]);

  const src =
    homeIMG?.secure_url ?? homeIMG?.url?.replace(/^http:\/\//, 'https://');

  if (!src) {
    return null;
  }

  return (
    <LazyLoadImage
      src={src}
      className="content bg-img"
      alt="ryan's work"
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        objectFit: 'cover',
      }}
      wrapperProps={{
        style: {
          transitionDelay: '1s',
          display: 'block',
          width: '100vw',
          height: '100vh',
        },
      }}
      effect="blur"
    />
  );
}
