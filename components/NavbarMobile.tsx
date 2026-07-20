'use client';

import { useState } from 'react';
import NavMenu from './NavMenu';

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className="fixed top-[5px] z-[2] block desktop:hidden">
      <div
        className="font-alter ml-2.5 text-[30px] leading-[15px]"
        onClick={toggleNav}
      >
        Menu
      </div>
      <div
        className={`fixed left-0 top-0 z-[2] h-full w-full transition-opacity duration-200 ease-in ${
          isOpen
            ? 'visible bg-black/50 opacity-100'
            : 'invisible opacity-0'
        }`}
        onClick={toggleNav}
      />
      <div
        className={`fixed top-0 z-[2] h-full w-1/2 overflow-y-auto bg-white transition-opacity duration-200 ease-in ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="relative mt-[5px] h-full w-full p-0 text-left [&_.font-alter]:ml-2.5 [&_.font-alter]:text-[30px] [&_.font-alter]:leading-[15px]">
          <NavMenu toggleNav={toggleNav} />
        </div>
      </div>
    </div>
  );
}
