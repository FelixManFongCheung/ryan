'use client';

import { create } from 'zustand';
import type {
  CollectionDescription,
  CollectionsMap,
  GalleryImage,
  HomeImage,
  MetadataField,
} from './types';

type CollectionsState = {
  collections: CollectionsMap;
  selectedName: string | null;
  selectedImages: GalleryImage[];
  description: CollectionDescription | null;
  about: MetadataField[];
  homeIMG: HomeImage | null;
  setCollections: (collections: CollectionsMap) => void;
  setSelectedName: (name: string) => void;
  setAbout: (about: MetadataField[]) => void;
  setHomeIMG: (img: HomeImage) => void;
  clearState: () => void;
  clearImages: () => void;
};

export const useCollectionsStore = create<CollectionsState>((set, get) => ({
  collections: {},
  selectedName: null,
  selectedImages: [],
  description: null,
  about: [],
  homeIMG: null,
  setCollections: (collections) => set({ collections }),
  setSelectedName: (name) => {
    const selectedCollection = get().collections[name];
    set({
      selectedName: name,
      selectedImages: selectedCollection?.images ?? [],
      description: selectedCollection?.description ?? null,
    });
  },
  setAbout: (about) => set({ about }),
  setHomeIMG: (img) => set({ homeIMG: img }),
  clearState: () =>
    set({
      collections: {},
      selectedName: null,
      selectedImages: [],
      description: null,
    }),
  clearImages: () => set({ selectedImages: [] }),
}));
