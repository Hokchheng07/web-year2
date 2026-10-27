
"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import logo from "@/app/m2-year2-logo.svg";
import { menuList } from "@/lib/menu-list";
import { MenuItem } from "./NavbarComponent";

export default function DesktopNavbarComponent() {
  return (
    <nav className="hidden w-full grid-cols-[1fr_auto_1fr] items-center lg:grid">
      <a
        href={'/'}
        className="flex items-center gap-2 justify-self-start"
      >
        <Image
          src={logo}
          className="h-10 w-auto"
          alt={"M2-Year2 logo"}
        />

      </a>
      {/* navigation menu-list */}
      <NavigationMenu className="justify-self-center">
        <NavigationMenuList className="gap-1">
          {menuList.map((item) => renderMenuItem(item))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* login and register button */}
      <div className="flex items-center gap-3 justify-self-end">
        <Button variant="outline" size="lg" className="px-5" render={<a href={'/login'} />} nativeButton={false}>Login</Button>
        <Button size="lg" className="px-5" render={<a href={'/register'} />} nativeButton={false}>Register</Button>
      </div>
    </nav>
  )
}

// render url and name of each pages
export const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.name}>
      <NavigationMenuLink href={item.url} className="px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-foreground">{item.name}</NavigationMenuLink>
    </NavigationMenuItem>
  );
}

