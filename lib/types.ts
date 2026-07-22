export type GalleryImage = {
  url: string;
  /** Cloudinary upload timestamp (ISO), for ordering/debug */
  created_at?: string;
};

export type CollectionDescription = {
  caption?: string;
  alt?: string;
  dimension?: string;
  [key: string]: string | undefined;
};

export type Collection = {
  description?: CollectionDescription;
  images: GalleryImage[];
};

export type CollectionsMap = Record<string, Collection>;

export type MetadataField = {
  default_value: string;
  [key: string]: unknown;
};

export type ContactData = {
  instagram: MetadataField;
  email: MetadataField;
};

export type HomeImage = {
  url?: string;
  secure_url?: string;
  [key: string]: unknown;
};

export type CloudinarySegment =
  | 'works'
  | 'editions'
  | 'curatorialprojects'
  | 'about'
  | 'contact'
  | 'home';
