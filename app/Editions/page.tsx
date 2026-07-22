import Works from '@/components/Works';
import { getCollections } from '@/lib/data';

export const revalidate = 3600;

export default async function EditionsPage() {
  const collections = await getCollections('editions');
  return (
    <Works segment="editions" editionBoolean initialCollections={collections} />
  );
}
