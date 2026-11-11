
"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

export function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  function createPageURL(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4 py-6"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg bg-green-700 px-4 py-2
                     font-semibold text-white hover:bg-green-800
                     focus-visible:outline-2
                     focus-visible:outline-offset-2
                     focus-visible:outline-green-700"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg bg-gray-100 px-4 py-2 text-gray-500">
          Previous
        </span>
      )}

      <span className="font-medium text-green-900">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg bg-green-700 px-4 py-2
                     font-semibold text-white hover:bg-green-800
                     focus-visible:outline-2
                     focus-visible:outline-offset-2
                     focus-visible:outline-green-700"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg bg-gray-100 px-4 py-2 text-gray-500">
          Next
        </span>
      )}
    </nav>
  );
}
