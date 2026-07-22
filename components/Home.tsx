import BlurFadeImage from '@/components/BlurFadeImage';
import ClearCollections from '@/components/ClearCollections';

type HomeProps = {
  src: string;
};

export default function Home({ src }: HomeProps) {
  return (
    <>
      <ClearCollections />
      <BlurFadeImage
        url={src}
        alt="ryan's work"
        fill
        priority
        placeholder={false}
        transform="f_auto,q_auto,w_1920,c_fill,g_auto"
        sizes="100vw"
        wrapperClassName="content relative h-screen w-screen"
        className="bg-img object-cover"
      />
    </>
  );
}
