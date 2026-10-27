
import { Menu } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import logo from "@/app/m2-year2-logo.svg";
import { menuList } from "@/lib/menu-list";
import Link from "next/link";
import { MenuItem } from "./NavbarComponent";

export default function MobileNavbarComponent() {
  return (
    <div className="block w-full lg:hidden">
      <div className="flex items-center justify-between">
        <a href={'/'} className="flex items-center gap-2">
          <Image
            src={logo}
            className="h-9 w-auto"
            alt={"M2-Year2 logo"}
          />
        </a>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon" />}><Menu className="size-4" /></SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <a href={'/'} className="flex items-center gap-2">
                  <Image
                    src={logo}
                    className="h-9 w-auto"
                    alt={"M2-Year2 logo"}
                  />
                </a>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion className="flex w-full flex-col gap-4">
                {menuList.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                <Button variant="outline" render={<a href={'/login'} />} nativeButton={false}>Login</Button>
                <Button render={<a href={'/register'} />} nativeButton={false}>Register</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <AccordionItem key={item.name} value={item.name} className="border-b-0">
      <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
        <Link href={item.url}>{item.name}</Link>
      </AccordionTrigger>
    </AccordionItem>
  );
}