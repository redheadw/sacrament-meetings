
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-green-900">
          Sacrament Meetings
        </h2>

        <p className="mt-2 text-gray-700">
          Browse upcoming and previous meeting programs
          for Sample Ward.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </section>
  );
}
