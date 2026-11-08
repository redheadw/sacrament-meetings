
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00Z`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="rounded-xl border border-green-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-green-900">
        {formattedDate}
      </h3>

      <p className="mt-2 capitalize text-gray-700">
        Meeting Type: {meeting.meetingType}
      </p>

      <p className="mt-2 text-gray-700">
        Conducting: {meeting.conducting}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-4 inline-block rounded-lg bg-green-800 px-4 py-2 font-semibold text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
      >
        View Meeting Program
      </Link>
    </article>
  );
}
