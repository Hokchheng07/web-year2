"use client"

import Image from "next/image";
import Logo from "../../app/m2-year2-logo.svg";
import Link from "next/link";
import { list } from "../../app/libs/menu-list"
import { usePathname } from "next/navigation";
export default function NavbarComponents() {
    const pathName = usePathname();
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-y-3 px-4 py-3 sm:grid-cols-[1fr_auto_1fr] sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="M2-Year2 home"
          className="shrink-0 justify-self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <Image
            src={Logo}
            alt="M2-Year2"
            width={155}
            height={60}
            priority
            className="h-auto w-24 sm:w-[155px]"
          />
        </Link>

        <div className="col-span-2 row-start-2 flex items-center justify-center gap-6 text-sm font-medium sm:col-span-1 sm:row-start-auto sm:justify-self-center sm:gap-8">
          {/* <Link
            href="/product"
            className="rounded-sm py-2 text-slate-600 transition-colors hover:text-blue-700 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Products
          </Link> */}
          {list.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="rounded-sm py-2 text-slate-600 transition-colors hover:text-blue-700 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {item.url == pathName ? <p className="text-red-600">{item.name}</p> : item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-self-end text-xs font-medium sm:gap-3 sm:text-sm">
          <Link
            href="/login"
            className="rounded-md border border-slate-200 px-2.5 py-1.5 text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 sm:py-2"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-blue-600 px-2.5 py-1.5 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 sm:py-2"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
