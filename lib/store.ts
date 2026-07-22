'use client';

import { create } from 'zustand';
import type {
  CollectionDescription,
  CollectionsMap,
  GalleryImage,
} from './types';

type CollectionsState = {
  collections: CollectionsMap;
  selectedName: string | null;
  selectedImages: GalleryImage[];
  description: CollectionDescription | null;
  setCollections: (collections: CollectionsMap) => void;
  setSelectedName: (name: string) => void;
  clearState: () => void;
  clearImages: () => void;
};

export const useCollectionsStore = create<CollectionsState>((set, get) => ({
  collections: {},
  selectedName: null,
  selectedImages: [],
  description: null,
  setCollections: (collections) => set({ collections }),
  setSelectedName: (name) => {
    const selectedCollection = get().collections[name];
    set({
      selectedName: name,
      selectedImages: selectedCollection?.images ?? [],
      description: selectedCollection?.description ?? null,
    });
  },
  clearState: () =>
    set({
      collections: {},
      selectedName: null,
      selectedImages: [],
      description: null,
    }),
  clearImages: () => set({ selectedImages: [] }),
}));
