import BlurFadeImage from './BlurFadeImage';

type ResponsiveImageProps = {
  url: string;
  alt?: string;
  priority?: boolean;
};

export default function ResponsiveImage({
  url,
  alt = "ryan's work",
  priority = false,
}: ResponsiveImageProps) {
  return (
    <BlurFadeImage
      url={url}
      alt={alt}
      priority={priority}
      transform="f_auto,q_auto,w_1000,c_scale"
      sizes="(max-width: 767px) 80vw, 60vw"
      wrapperClassName="gallery-image mb-[30px] w-full"
      className="image-fade h-auto w-full"
    />
  );
}
