
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const headerList = await headers();
  const host = headerList.get("host");

  if (!host) {
    throw new Error("Unable to determine server host");
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load meeting");
  }

  const meeting: SacramentMeeting = await response.json();

  return (
    <div className="space-y-6">
      <nav aria-label="Meeting navigation">
        <Link
          href="/meetings"
          className="font-semibold text-green-800 hover:underline"
        >
          ← Back to Meetings
        </Link>
      </nav>

      <MeetingDetail meeting={meeting} />

      <p className="text-sm text-gray-600 print:hidden">
        To print this program, press Ctrl + P
        (or Command + P on Mac).
      </p>
    </div>
  );
}

export default function MeetingPage({
  params,
}: MeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p role="status" className="p-6 text-green-900">
          Loading meeting program...
        </p>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}
