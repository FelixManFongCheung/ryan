import { v2 as cloudinary } from 'cloudinary';
import { getImageSuffixNumber } from './orderCollections';
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

async function listFolderResources(folderPath: string): Promise<CloudinaryResource[]> {
  const resources: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const page = await cloudinary.api.resources_by_asset_folder(folderPath, {
      context: true,
      max_results: 500,
      next_cursor: nextCursor,
    });
    resources.push(...((page.resources ?? []) as CloudinaryResource[]));
    nextCursor = page.next_cursor as string | undefined;
  } while (nextCursor);

  return resources;
}

async function fetchCollections(folderRoot: string): Promise<CollectionsMap> {
  const { folders: subfolders } = await cloudinary.api.sub_folders(folderRoot);
  const data: CollectionsMap = {};

  await Promise.all(
    subfolders.map(async (folder: { path: string; name: string }) => {
      const resources = await listFolderResources(folder.path);
      if (!resources.length) {
        return;
      }

      const orderedImages = [...resources].sort(
        (a, b) =>
          getImageSuffixNumber(a.public_id) - getImageSuffixNumber(b.public_id)
      );
      const descriptionSource =
        orderedImages.find((image) => image.context?.custom) ?? orderedImages[0];
      const folderName = folder.name.replace(/_/g, ' ');

      data[folderName] = {
        description: descriptionSource?.context?.custom,
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
