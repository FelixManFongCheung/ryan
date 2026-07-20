'use client';

import { useEffect, useState } from 'react';
import { useCollectionsStore } from '@/lib/store';
import type { ContactData } from '@/lib/types';

export default function Contact() {
  const [instagram, setInstagram] = useState<string>();
  const [email, setEmail] = useState<string>();
  const clearState = useCollectionsStore((state) => state.clearState);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await fetch('/api/cloudinary/contact');
      const data = (await response.json()) as ContactData;
      setInstagram(data.instagram.default_value);
      setEmail(data.email.default_value);
    };
    fetchContact();
    clearState();
  }, [clearState]);

  return (
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
  );
}
