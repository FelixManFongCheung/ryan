import Contact from '@/components/Contact';
import { getContact } from '@/lib/data';

export const revalidate = 600;

export default async function ContactPage() {
  const contact = await getContact();
  return (
    <Contact
      instagram={contact.instagram.default_value}
      email={contact.email.default_value}
    />
  );
}
