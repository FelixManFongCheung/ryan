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
  created_at?: string;
  context?: {
    custom?: Collection['description'];
  };
};

function byUploadOrder(a: CloudinaryResource, b: CloudinaryResource): number {
  const aTime = a.created_at ? Date.parse(a.created_at) : 0;
  const bTime = b.created_at ? Date.parse(b.created_at) : 0;
  return aTime - bTime;
}

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

      // Description: unchanged — pick first asset that has structured context.
      const descriptionSource =
        resources.find((image) => image.context?.custom) ?? resources[0];

      // Images only: oldest upload first.
      const orderedImages = [...resources].sort(byUploadOrder);
      const folderName = folder.name.replace(/_/g, ' ');
      const description = descriptionSource?.context?.custom;
      const images = orderedImages.map((image) => ({
        url: image.secure_url,
        created_at: image.created_at,
      }));

      data[folderName] = {
        description,
        images,
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
