import { v2 as cloudinary } from 'cloudinary';
import type {
  CloudinarySegment,
  Collection,
  CollectionsMap,
  ContactData,
  HomeImage,
  MetadataField,
} from './types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: Collection['description'];
  };
};

function getImageNumber(item: CloudinaryResource): number {
  const parts = item.public_id.split('/');
  const basename = parts[parts.length - 1] ?? '';
  const match = basename.match(/(\d+)$/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function quickSort(
  arr: CloudinaryResource[],
  direction: 'ascending' | 'descending' = 'ascending'
): CloudinaryResource[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivotID = getImageNumber(arr[pivotIndex]);
  const left: CloudinaryResource[] = [];
  const right: CloudinaryResource[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    const iterationID = getImageNumber(arr[i]);
    if (
      (direction === 'ascending' && iterationID < pivotID) ||
      (direction === 'descending' && iterationID > pivotID)
    ) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [
    ...quickSort(left, direction),
    arr[pivotIndex],
    ...quickSort(right, direction),
  ];
}

async function fetchCollections(folderRoot: string): Promise<CollectionsMap> {
  const { folders: subfolders } = await cloudinary.api.sub_folders(folderRoot);
  const data: CollectionsMap = {};

  await Promise.all(
    subfolders.map(async (folder: { path: string; name: string }) => {
      const images = await cloudinary.api.resources_by_asset_folder(folder.path, {
        tags: true,
        metadata: true,
        context: true,
      });

      const resources = images.resources as CloudinaryResource[];
      if (!resources?.length) {
        return;
      }

      const descriptionResource = await cloudinary.api.resource(
        resources[0].public_id
      );
      const orderedImages = quickSort(resources);
      const folderName = folder.name.replace(/_/g, ' ');

      data[folderName] = {
        description: (descriptionResource as CloudinaryResource)?.context?.custom,
        images: orderedImages.map((image) => ({
          url: image.secure_url,
        })),
      } satisfies Collection;
    })
  );

  return data;
}

export async function fetchBySegment(
  segment: CloudinarySegment
): Promise<CollectionsMap | MetadataField[] | ContactData | HomeImage> {
  if (
    segment === 'works' ||
    segment === 'curatorialprojects' ||
    segment === 'editions'
  ) {
    return fetchCollections(segment);
  }

  if (segment === 'about') {
    const aboutIds = (process.env.ABOUT ?? '').split(',').filter(Boolean);
    return Promise.all(
      aboutIds.map(async (para) => {
        return (await cloudinary.api.metadata_field_by_field_id(
          para
        )) as unknown as MetadataField;
      })
    );
  }

  if (segment === 'contact') {
    const [insta, mail] = await Promise.all([
      cloudinary.api.metadata_field_by_field_id(process.env.INSTAGRAM as string),
      cloudinary.api.metadata_field_by_field_id(process.env.EMAIL as string),
    ]);
    return {
      instagram: insta as unknown as MetadataField,
      email: mail as unknown as MetadataField,
    };
  }

  return (await cloudinary.api.resource(
    'Haarlem_Roomview_gydkoi'
  )) as unknown as HomeImage;
}
