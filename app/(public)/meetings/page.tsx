
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages, } from "@/lib/meetings-db";
import { Pagination } from "@/components/Pagination";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query ?? "";
  const currentPage = Math.max(
    1,
    Number(params.page) || 1
  );

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-green-900">
          Sacrament Meetings
        </h2>

        <Pagination totalPages={totalPages} />
      </div>

      <MeetingSearch />

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>

      {meetings.length === 0 && (
        <p className="rounded-lg bg-gray-100 p-6 text-gray-700">
          No meetings found. Try a different search.
        </p>
      )}

      <p className="text-sm text-gray-600">
        Page {currentPage} of {Math.max(1, totalPages)}
      </p>
    </section>
  );
}
