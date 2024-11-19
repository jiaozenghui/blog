"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderMenu } from "./Menu";
import { ThemeToggle } from "./ThemeToggle";

import AuthLinks from "./authLinks/AuthLinks";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
      <div className="max-w-8xl mx-auto ">
        <div className="flex h-16 items-center justify-between  py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <Sheet>
            <SheetTrigger className="md:hidden ">
              <Image
                src="/icons/hamburger.svg"
                width={30}
                height={30}
                alt="menu"
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-black-1">
              <Link
                href="/"
                className="flex cursor-pointer items-center gap-1 pb-10 pl-4"
              >
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={23}
                  height={27}
                />
                <h1 className="text-24 font-extrabold    ml-2">Jzh个人博客</h1>
              </Link>

              <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <SheetClose asChild>
                  <nav className="flex h-full flex-col gap-6  ">
                    {sidebarLinks.map(({ route, label, imgURL }) => {
                      const isActive =
                        pathname === route || pathname.startsWith(`${route}/`);

                      return (
                        <SheetClose asChild key={route}>
                          <Link
                            href={route}
                            className={cn(
                              "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                              {
                                "bg-nav-focus border-r-4 border-orange-1":
                                  isActive,
                              }
                            )}
                          >
                            <Image
                              src={imgURL}
                              alt={label}
                              width={24}
                              height={24}
                            />
                            <p>{label}</p>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex cursor-pointer items-center gap-1">
            <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold    ml-2">Jzh个人博客</h1>
          </Link>

          <div className="flex items-center gap-2">
            <HeaderMenu />
            <ThemeToggle />
            <AuthLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
