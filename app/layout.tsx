import type { Metadata } from 'next';
import NavbarDesktop from '@/components/NavbarDesktop';
import NavbarMobile from '@/components/NavbarMobile';
import './globals.css';

export const metadata: Metadata = {
  title: 'JUN RUI LO',
  description: "Ryan's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-site">
        <NavbarDesktop />
        <NavbarMobile />
        {children}
      </body>
    </html>
  );
}
