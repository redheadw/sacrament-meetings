
import type { ReactNode } from "react";
import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <nav
        aria-label="Meetings section navigation"
        className="flex flex-wrap gap-4 rounded-lg bg-green-100 p-4"
      >
        <Link
          href="/meetings"
          className="font-semibold text-green-900 hover:underline"
        >
          All Meetings
        </Link>

        <Link
          href="/meetings/current"
          className="font-semibold text-green-900 hover:underline"
        >
          Current Meeting
        </Link>
      </nav>

      {children}
    </div>
  );
}
