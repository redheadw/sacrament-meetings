
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";
import { requireApprovedAdmin } from "@/lib/require-admin";

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EditMeetingContent({
  params,
}: EditMeetingPageProps) {
  await connection();
  await requireApprovedAdmin();

  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <>
      <MeetingForm meeting={meeting} />

      <div className="mt-6">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-green-800 underline hover:text-green-950"
        >
          Cancel and return to meeting
        </Link>
      </div>
    </>
  );
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  return (
    <section className="mx-auto max-w-3xl p-8">
      <h1 className="mb-4 text-3xl font-bold text-green-900">
        Edit Meeting
      </h1>

      <p className="mb-6 text-gray-700">
        Update the meeting details below.
      </p>

      <Suspense fallback={<p>Checking access and loading meeting details...</p>}>
        <EditMeetingContent params={params} />
      </Suspense>
    </section>
  );
}
