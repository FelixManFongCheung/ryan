'use client';

import { useEffect } from 'react';
import { useCollectionsStore } from '@/lib/store';

/** Clears works titles from the mobile nav when leaving collection pages. */
export default function ClearCollections() {
  const clearState = useCollectionsStore((state) => state.clearState);

  useEffect(() => {
    clearState();
  }, [clearState]);

  return null;
}
