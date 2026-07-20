"use client";

import { orderCollections } from "@/lib/orderCollections";
import { useCollectionsStore } from "@/lib/store";
import type { CollectionsMap } from "@/lib/types";
import { useEffect } from "react";
import ResponsiveImage from "./ResponsiveImage";
import Titles from "./Titles";

type WorksProps = {
  segment: "works" | "editions" | "curatorialprojects";
  editionBoolean?: boolean;
};

export default function Works({ segment, editionBoolean }: WorksProps) {
  const collections = useCollectionsStore((state) => state.collections);
  const selectedImages = useCollectionsStore((state) => state.selectedImages);
  const titleName = useCollectionsStore((state) => state.selectedName);
  const description = useCollectionsStore((state) => state.description);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const setSelectedName = useCollectionsStore((state) => state.setSelectedName);
  const clearImages = useCollectionsStore((state) => state.clearImages);
  const clearState = useCollectionsStore((state) => state.clearState);

  useEffect(() => {
    clearState();

    const fetchCollections = async () => {
      const response = await fetch(`/api/cloudinary/${segment}`);
      const data = (await response.json()) as CollectionsMap;
      const orderedItems = orderCollections(data);
      setCollections(orderedItems);
      const firstName = Object.keys(orderedItems)[0];
      if (firstName) {
        setSelectedName(firstName);
      }
    };

    fetchCollections();
  }, [segment, clearState, setCollections, setSelectedName]);

  const handleChangingTitle = (title: string) => {
    clearImages();
    setSelectedName(title);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-content work flex flex-col">
      <Titles
        collections={collections}
        titleName={titleName}
        handleChangingTitle={handleChangingTitle}
        editionBoolean={editionBoolean}
      />

      {description && (
        <div className="info mb-[50px] ml-auto w-3/5 text-[15px] max-[478px]:text-[8px] max-desktop:mx-auto max-desktop:mb-[30px] max-desktop:w-4/5 max-desktop:text-[10px]">
          <div
            className="title"
            dangerouslySetInnerHTML={{ __html: description.caption ?? "" }}
          />
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description.alt ?? "" }}
          />
          <div
            className="dimension"
            dangerouslySetInnerHTML={{ __html: description.dimension ?? "" }}
          />
        </div>
      )}

      <div className="gallery ml-auto w-3/5 max-desktop:mx-auto max-desktop:w-4/5">
        {selectedImages.map((image, index) => (
          <ResponsiveImage
            key={`${image.url}-${index}`}
            url={image.url}
            alt={`${titleName ?? "work"} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
