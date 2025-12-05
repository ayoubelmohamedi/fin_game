"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logos */}
          <div className="flex items-center gap-5">
            {/* UM6P SOLE Logo */}
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/um6p-sole-logo.svg"
                alt="UM6P SOLE - Student Organizations, Leadership & Engagement"
                className="h-10 w-auto"
              />
            </Link>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

            {/* HIN Club Logo */}
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hin-logo.svg"
                alt="HIN - Hospitality Innovators Nexus"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-4">
            {!isHome && (
              <Link
                href="/"
                className="px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-medium text-sm"
              >
                ← All Games
              </Link>
            )}
            <div className="flex items-center px-2 py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/xibition-logo.svg"
                alt="X-ibition UM6P Student Club Fair"
                className="h-10 w-auto"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
