
import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-green-900">
        Create New Sacrament Meeting
      </h1>

      <p className="mb-8 text-gray-700">
        Enter the meeting details for Lake Valley Ward.
      </p>

      <MeetingForm />
    </main>
  );
}
