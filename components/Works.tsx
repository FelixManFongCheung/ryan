"use client";

import { useCollectionsStore } from "@/lib/store";
import type { CollectionsMap } from "@/lib/types";
import { useEffect } from "react";
import ResponsiveImage from "./ResponsiveImage";
import Titles from "./Titles";

type WorksProps = {
  segment: "works" | "editions" | "curatorialprojects";
  editionBoolean?: boolean;
  initialCollections: CollectionsMap;
};

export default function Works({
  segment,
  editionBoolean,
  initialCollections,
}: WorksProps) {
  const collections = useCollectionsStore((state) => state.collections);
  const selectedImages = useCollectionsStore((state) => state.selectedImages);
  const titleName = useCollectionsStore((state) => state.selectedName);
  const description = useCollectionsStore((state) => state.description);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const setSelectedName = useCollectionsStore((state) => state.setSelectedName);
  const clearImages = useCollectionsStore((state) => state.clearImages);

  useEffect(() => {
    setCollections(initialCollections);
    const firstName = Object.keys(initialCollections)[0];
    if (firstName) {
      setSelectedName(firstName);
    }
  }, [segment, initialCollections, setCollections, setSelectedName]);

  const handleChangingTitle = (title: string) => {
    clearImages();
    setSelectedName(title);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const displayCollections =
    Object.keys(collections).length > 0 ? collections : initialCollections;
  const displayName =
    titleName ?? Object.keys(displayCollections)[0] ?? null;
  const displayCollection = displayName
    ? displayCollections[displayName]
    : undefined;
  const displayImages = selectedImages.length
    ? selectedImages
    : (displayCollection?.images ?? []);
  const displayDescription = description ?? displayCollection?.description;

  return (
    <div className="page-content work flex flex-col">
      <Titles
        collections={displayCollections}
        titleName={displayName}
        handleChangingTitle={handleChangingTitle}
        editionBoolean={editionBoolean}
      />

      {displayDescription && (
        <div className="info mb-[50px] ml-auto w-3/5 text-[15px] max-[478px]:text-[8px] max-desktop:mx-auto max-desktop:mb-[30px] max-desktop:w-4/5 max-desktop:text-[10px]">
          <div
            className="title"
            dangerouslySetInnerHTML={{
              __html: displayDescription.caption ?? "",
            }}
          />
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: displayDescription.alt ?? "" }}
          />
          <div
            className="dimension"
            dangerouslySetInnerHTML={{
              __html: displayDescription.dimension ?? "",
            }}
          />
        </div>
      )}

      <div className="gallery ml-auto w-3/5 max-desktop:mx-auto max-desktop:w-4/5">
        {displayImages.map((image, index) => (
          <ResponsiveImage
            key={`${image.url}-${index}`}
            url={image.url}
            alt={`${displayName ?? "work"} ${index + 1}`}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
