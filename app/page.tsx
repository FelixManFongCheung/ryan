import Home from '@/components/Home';
import { getHomeImage, homeImageSrc } from '@/lib/data';

export const revalidate = 600;

export default async function HomePage() {
  const image = await getHomeImage();
  const src = homeImageSrc(image);

  if (!src) {
    return null;
  }

  return <Home src={src} />;
}
