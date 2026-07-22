import About from '@/components/About';
import { getAbout } from '@/lib/data';

export const revalidate = 3600;

export default async function AboutPage() {
  const abouts = await getAbout();
  return <About abouts={abouts} />;
}
