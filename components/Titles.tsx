'use client';

import type { CollectionsMap } from '@/lib/types';

type TitlesProps = {
  titleName: string | null;
  collections: CollectionsMap;
  handleChangingTitle: (title: string) => void;
  editionBoolean?: boolean;
  navMenu?: boolean;
};

export default function Titles({
  titleName,
  collections,
  handleChangingTitle,
  editionBoolean,
  navMenu,
}: TitlesProps) {
  const untitledOpen = editionBoolean ? '' : 'Untitled (';
  const untitledClose = editionBoolean ? '' : ')';

  return (
    <div
      className={`work-names ${
        navMenu
          ? 'relative mt-[15px] flex flex-col gap-[5px] before:absolute before:left-1/2 before:top-0 before:mt-[-15px] before:h-px before:w-4/5 before:-translate-x-1/2 before:border-t before:border-black before:content-[\'\']'
          : 'fixed z-[1] hidden cursor-pointer flex-col desktop:flex'
      }`}
    >
      {Object.keys(collections).map((foldername) => (
        <span
          key={foldername}
          className={`${navMenu ? 'font-alter mr-5 text-[25px] leading-5 tracking-tightest' : 'mb-2.5 block'} name-item cursor-pointer ${
            titleName === foldername ? 'selected' : ''
          }`}
          onClick={() => handleChangingTitle(foldername)}
        >
          {`${untitledOpen}${foldername}${untitledClose}`}
        </span>
      ))}
    </div>
  );
}
