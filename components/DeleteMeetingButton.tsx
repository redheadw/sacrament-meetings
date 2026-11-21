
"use client";

import { useState, useTransition } from "react";
import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingButtonProps {
  meetingId: number;
}

export default function DeleteMeetingButton({
  meetingId,
}: DeleteMeetingButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);

    startTransition(async () => {
      try {
        await deleteMeeting(meetingId);
      } catch (error) {
        console.error("Failed to delete meeting:", error);
        setError("Unable to delete the meeting. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-3">
      {!showConfirmation ? (
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="rounded border border-red-700 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
        >
          Delete Meeting
        </button>
      ) : (
        <div className="rounded border border-red-300 bg-red-50 p-4">
          <p className="mb-3 font-semibold text-red-900">
            Are you sure you want to delete this meeting?
          </p>

          <p className="mb-4 text-sm text-red-800">
            This action cannot be undone.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:opacity-50"
            >
              {isPending ? "Deleting..." : "Yes, Delete Meeting"}
            </button>

            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              disabled={isPending}
              className="rounded border border-gray-400 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
