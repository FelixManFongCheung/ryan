import Works from '@/components/Works';
import { getCollections } from '@/lib/data';

export const revalidate = 3600;

export default async function WorksPage() {
  const collections = await getCollections('works');
  return <Works segment="works" initialCollections={collections} />;
}
