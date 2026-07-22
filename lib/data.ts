import { unstable_cache } from 'next/cache';
import { fetchBySegment } from './cloudinary';
import { orderCollections } from './orderCollections';
import type {
  CollectionsMap,
  ContactData,
  HomeImage,
  MetadataField,
} from './types';

/** Revalidate Cloudinary-backed pages hourly. */
export const CLOUDINARY_REVALIDATE_SECONDS = 3600;

type CollectionSegment = 'works' | 'editions' | 'curatorialprojects';

export function getCollections(segment: CollectionSegment) {
  return unstable_cache(
    async (): Promise<CollectionsMap> => {
      const data = (await fetchBySegment(segment)) as CollectionsMap;
      return orderCollections(data);
    },
    ['cloudinary-collections', segment],
    {
      revalidate: CLOUDINARY_REVALIDATE_SECONDS,
      tags: ['cloudinary', `cloudinary-${segment}`],
    }
  )();
}

export function getAbout() {
  return unstable_cache(
    async (): Promise<MetadataField[]> => {
      return (await fetchBySegment('about')) as MetadataField[];
    },
    ['cloudinary-about'],
    {
      revalidate: CLOUDINARY_REVALIDATE_SECONDS,
      tags: ['cloudinary', 'cloudinary-about'],
    }
  )();
}

export function getContact() {
  return unstable_cache(
    async (): Promise<ContactData> => {
      return (await fetchBySegment('contact')) as ContactData;
    },
    ['cloudinary-contact'],
    {
      revalidate: CLOUDINARY_REVALIDATE_SECONDS,
      tags: ['cloudinary', 'cloudinary-contact'],
    }
  )();
}

export function getHomeImage() {
  return unstable_cache(
    async (): Promise<HomeImage> => {
      return (await fetchBySegment('home')) as HomeImage;
    },
    ['cloudinary-home'],
    {
      revalidate: CLOUDINARY_REVALIDATE_SECONDS,
      tags: ['cloudinary', 'cloudinary-home'],
    }
  )();
}

export function homeImageSrc(image: HomeImage): string | null {
  const raw =
    image.secure_url ?? image.url?.replace(/^http:\/\//, 'https://') ?? null;
  return raw;
}
