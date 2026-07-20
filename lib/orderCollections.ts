import type { CollectionsMap, GalleryImage } from './types';

/** Sort key from final URL segment, e.g. `.../image_3.jpg` → 3 */
export function getImageSuffixNumber(url: string): number {
  const segment = url.split('/').pop() ?? '';
  const basename = segment.replace(/\.[^.]+$/, '');
  const match = basename.match(/(\d+)$/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

export function sortImagesBySuffix(images: GalleryImage[]): GalleryImage[] {
  return [...images].sort(
    (a, b) => getImageSuffixNumber(a.url) - getImageSuffixNumber(b.url)
  );
}

export function orderCollections(data: CollectionsMap): CollectionsMap {
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const numA = parseInt(a.split(' ')[0], 10);
    const numB = parseInt(b.split(' ')[0], 10);
    return numA - numB;
  });

  const orderedItems: CollectionsMap = {};
  sortedKeys.forEach((key) => {
    const name = key.split(' ').slice(1).join(' ');
    const collection = data[key];
    orderedItems[name] = {
      ...collection,
      images: sortImagesBySuffix(collection.images),
    };
  });
  return orderedItems;
}
