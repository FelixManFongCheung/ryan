'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Titles from './Titles';
import { useCollectionsStore } from '@/lib/store';

type NavMenuProps = {
  desktopMenu?: string;
  toggleNav?: () => void;
};

export default function NavMenu({ desktopMenu, toggleNav }: NavMenuProps) {
  const pathname = usePathname();
  const collections = useCollectionsStore((state) => state.collections);
  const titleName = useCollectionsStore((state) => state.selectedName);
  const setSelectedName = useCollectionsStore((state) => state.setSelectedName);

  const matchEdition = pathname === '/Editions';
  const matchCuratorial = pathname === '/CuratorialProjects';

  const handleClick = () => {
    toggleNav?.();
  };

  const handleChangingTitle = (title: string) => {
    handleClick();
    setSelectedName(title);
  };

  return (
    <div
      className={`nav-menu list-none text-center ${desktopMenu ?? ''} ${
        desktopMenu
          ? 'fixed top-0 z-[1] m-0 hidden pl-2.5 text-2xl desktop:block [&_.work-names]:hidden'
          : ''
      }`}
    >
      <div
        className={`menu-titles ${
          desktopMenu ? '' : 'mb-[30px] flex flex-col gap-[5px]'
        }`}
      >
        <div className="font-alter" onClick={handleClick}>
          <Link href="/" title="Home">
            Home
          </Link>
        </div>
        <div className="font-alter" onClick={handleClick}>
          <Link href="/Works" title="Works">
            Works
          </Link>
        </div>
        <div className="font-alter" onClick={handleClick}>
          <Link href="/CuratorialProjects" title="Curatorial Projects">
            Curatorial Projects
          </Link>
        </div>
        <div className="font-alter" onClick={handleClick}>
          <Link href="/Editions" title="Editions">
            Editions
          </Link>
        </div>
        <div className="font-alter" onClick={handleClick}>
          <Link href="/About" title="About">
            About
          </Link>
        </div>
        <div className="font-alter" onClick={handleClick}>
          <Link href="/Contact" title="Contact">
            Contact
          </Link>
        </div>
      </div>
      {Object.keys(collections).length !== 0 && (
        <Titles
          navMenu
          collections={collections}
          titleName={titleName}
          handleChangingTitle={handleChangingTitle}
          editionBoolean={Boolean(matchEdition || matchCuratorial)}
        />
      )}
    </div>
  );
}
