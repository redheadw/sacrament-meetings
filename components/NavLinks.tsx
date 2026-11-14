"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/new", label: "Create Meeting" },
  ];

  return (
    <nav aria-label="Main navigation" className="mt-4">
      <div className="flex flex-wrap gap-4">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : link.href === "/meetings"
                ? pathname === "/meetings" ||
                  (pathname.startsWith("/meetings/") &&
                    pathname !== "/meetings/new")
                : pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-lg px-3 py-2 font-semibold
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
                ${
                  isActive
                    ? "bg-white text-green-900"
                    : "text-white hover:bg-green-700"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
