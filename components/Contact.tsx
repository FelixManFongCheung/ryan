import ClearCollections from '@/components/ClearCollections';

type ContactProps = {
  instagram: string;
  email: string;
};

export default function Contact({ instagram, email }: ContactProps) {
  return (
    <>
      <ClearCollections />
      <div className="page-content contact text-base leading-[2]">
        <a
          href="https://www.instagram.com/ryanmoyii_"
          target="_blank"
          rel="noreferrer"
          className="instagram"
        >
          {instagram}
        </a>
        <div className="email">{email}</div>
      </div>
    </>
  );
}
