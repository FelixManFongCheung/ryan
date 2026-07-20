'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type ResponsiveImageProps = {
  url: string;
  alt?: string;
};

export default function ResponsiveImage({
  url,
  alt = "ryan's work",
}: ResponsiveImageProps) {
  const intrinsicWidth = 1000;
  const correctedURL = url.replace(
    '/upload/',
    `/upload/w_${intrinsicWidth},c_scale,q_auto:best/`
  );

  return (
    <LazyLoadImage
      src={correctedURL}
      className="gallery-image image-fade mb-[30px] h-auto w-full"
      alt={alt}
      wrapperClassName="block w-full"
      wrapperProps={{
        style: { transitionDelay: '1s' },
      }}
      effect="blur"
    />
  );
}
