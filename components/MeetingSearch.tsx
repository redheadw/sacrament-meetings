
"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      // Reset pagination when searching
      params.set("page", "1");

      if (term.trim()) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="relative">
      <label
        htmlFor="meeting-search"
        className="mb-2 block font-medium text-green-900"
      >
        Search Meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={
          searchParams.get("query")?.toString() ?? ""
        }
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search meetings"
        className="w-full rounded-lg border border-gray-300
                   bg-white px-4 py-3 text-gray-900
                   focus:border-green-700 focus:outline-none
                   focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
