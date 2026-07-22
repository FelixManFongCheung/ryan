import Works from '@/components/Works';
import { getCollections } from '@/lib/data';

export const revalidate = 3600;

export default async function CuratorialProjectsPage() {
  const collections = await getCollections('curatorialprojects');
  return (
    <Works
      segment="curatorialprojects"
      editionBoolean
      initialCollections={collections}
    />
  );
}
