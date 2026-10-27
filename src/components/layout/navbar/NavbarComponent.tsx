"use client";

import DesktopNavbarComponent from "./DesktopNavbarComponent";
import MobileNavbarComponent from "./MobileNavbarComponent";
export interface MenuItem {
  url: string;
  name: string;
}

const NavbarComponent = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* display when Desktop Screen */}
        <DesktopNavbarComponent />

        {/* display when Mobile Screen */}
        <MobileNavbarComponent />
      </div>
    </header>
  );
};

export { NavbarComponent };
