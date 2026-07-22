'use client';

import { withCloudinaryTransform } from '@/lib/cloudinaryUrl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

type BlurFadeImageProps = {
  url: string;
  alt?: string;
  priority?: boolean;
  /** When false, skip Cloudinary LQIP and start from blank. */
  placeholder?: boolean;
  transform?: string;
  blurTransform?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
};

export default function BlurFadeImage({
  url,
  alt = "ryan's work",
  priority = false,
  placeholder = true,
  transform = 'f_auto,q_auto,w_1000,c_scale',
  blurTransform = 'f_auto,q_auto,w_40,e_blur:1000,c_scale',
  width = 1000,
  height = 1500,
  fill = false,
  sizes,
  className = '',
  wrapperClassName = '',
  style,
}: BlurFadeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const src = withCloudinaryTransform(url, transform);
  const blurSrc = withCloudinaryTransform(url, blurTransform);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {placeholder && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: loaded ? 0 : 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blurSrc}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            draggable={false}
          />
        </motion.div>
      )}

      <motion.div
        className={fill ? 'absolute inset-0' : 'relative'}
        initial={{ opacity: 0, filter: 'blur(16px)' }}
        animate={
          loaded
            ? { opacity: 1, filter: 'blur(0px)' }
            : { opacity: 0, filter: 'blur(16px)' }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          {...(fill
            ? { fill: true }
            : {
                width,
                height,
                style: { width: '100%', height: 'auto', ...style },
              })}
          sizes={sizes}
          priority={priority}
          unoptimized
          onLoad={() => setLoaded(true)}
          className={className}
        />
      </motion.div>
    </div>
  );
}
