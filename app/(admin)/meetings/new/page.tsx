
import { Suspense } from "react";
import { connection } from "next/server";
import MeetingForm from "@/components/MeetingForm";
import { requireApprovedAdmin } from "@/lib/require-admin";

async function ProtectedMeetingForm() {
  await connection();
  await requireApprovedAdmin();

  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-green-900">
        Create New Sacrament Meeting
      </h1>

      <p className="mb-8 text-gray-700">
        Enter the meeting details for Lake Valley Ward.
      </p>

      <MeetingForm />
    </section>
  );
}

export default function NewMeetingPage() {
  return (
    <Suspense fallback={<p>Checking administrator access...</p>}>
      <ProtectedMeetingForm />
    </Suspense>
  );
}
