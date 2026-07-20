'use client';

import { useEffect } from 'react';
import { useCollectionsStore } from '@/lib/store';
import type { MetadataField } from '@/lib/types';

export default function About() {
  const abouts = useCollectionsStore((state) => state.about);
  const setAbout = useCollectionsStore((state) => state.setAbout);
  const clearState = useCollectionsStore((state) => state.clearState);

  useEffect(() => {
    const fetchAbout = async () => {
      const response = await fetch('/api/cloudinary/about');
      const data = (await response.json()) as MetadataField[];
      setAbout(data);
    };
    fetchAbout();
    clearState();
  }, [clearState, setAbout]);

  return (
    <div className="page-content name w-1/2 text-justify text-base leading-[2] max-desktop:w-4/5">
      {abouts.map((about, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: about.default_value }} />
          <br />
        </div>
      ))}
    </div>
  );
}
