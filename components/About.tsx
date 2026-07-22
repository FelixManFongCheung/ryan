import ClearCollections from '@/components/ClearCollections';
import type { MetadataField } from '@/lib/types';

type AboutProps = {
  abouts: MetadataField[];
};

export default function About({ abouts }: AboutProps) {
  return (
    <>
      <ClearCollections />
      <div className="page-content name w-1/2 text-justify text-base leading-[2] max-desktop:w-4/5">
        {abouts.map((about, index) => (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: about.default_value }} />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
