import type { CollectionsMap } from './types';

/** Order collection folders by numeric prefix; keep image order from the API. */
export function orderCollections(data: CollectionsMap): CollectionsMap {
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const numA = parseInt(a.split(' ')[0], 10);
    const numB = parseInt(b.split(' ')[0], 10);
    return numA - numB;
  });

  const orderedItems: CollectionsMap = {};
  sortedKeys.forEach((key) => {
    const name = key.split(' ').slice(1).join(' ');
    orderedItems[name] = data[key];
  });
  return orderedItems;
}
