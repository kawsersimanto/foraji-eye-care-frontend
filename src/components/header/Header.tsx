"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigationItems = [
  { name: "Branches", href: "/branches" },
  { name: "Doctors", href: "/doctors" },
  { name: "Shop", href: "/shop" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm py-5">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
            height={200}
            width={200}
            className="sm:w-[200px] sm:h-[40px] w-[160px] h-[28px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Button className="text-white">Make Appointment</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-auto w-auto block !p-0">
                <Menu className="!w-7 !h-7" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetTitle>
              <span className="sr-only">Mobile Menu</span>
            </SheetTitle>
            <SheetContent side="left">
              <SheetHeader>
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
                    height={200}
                    width={200}
                    className="sm:w-[200px] sm:h-[40px] w-[160px] h-[28px] object-contain"
                  />
                </Link>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6 px-4">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button className="text-white mt-5" asChild>
                  <Link href="/appointment">Make Appointment</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
