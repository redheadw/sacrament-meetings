
"use client";

import { useActionState } from "react";
import { createMeeting, updateMeeting } from "@/lib/actions";
import { initialState } from "@/lib/meeting-form-state";
import type { State } from "@/lib/meeting-form-state";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({
  meeting,
}: MeetingFormProps) {
  const isEditing = Boolean(meeting);

  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState<
    State,
    FormData
  >(action, initialState);

  const errorMessage = (
    field: keyof NonNullable<State["errors"]>
  ) =>
    state.errors?.[field]?.map((error, index) => (
      <p key={`${field}-${index}`}>{error}</p>
    ));

  const fieldClass = "w-full rounded border p-2";
  const errorClass = "mt-1 text-sm text-red-700";

  return (
    <form action={formAction} className="space-y-6">
      {/* Meeting Date */}
      <div>
        <label htmlFor="date" className="mb-2 block font-medium">
          Meeting Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={meeting?.date ?? ""}
          aria-describedby="date-error"
          aria-invalid={Boolean(state.errors?.date?.length)}
          className={fieldClass}
        />
        <div id="date-error" aria-live="polite" className={errorClass}>
          {errorMessage("date")}
        </div>
      </div>

      {/* Meeting Type */}
      <div>
        <label htmlFor="meetingType" className="mb-2 block font-medium">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          required
          defaultValue={meeting?.meetingType ?? ""}
          aria-describedby="meetingType-error"
          aria-invalid={Boolean(state.errors?.meetingType?.length)}
          className={fieldClass}
        >
          <option value="" disabled>
            Select meeting type
          </option>
          <option value="testimony">Testimony</option>
          <option value="regular">Regular</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <div id="meetingType-error" aria-live="polite" className={errorClass}>
          {errorMessage("meetingType")}
        </div>
      </div>

      {/* Presiding Officer */}
      <div>
        <label htmlFor="presiding" className="mb-2 block font-medium">
          Presiding Officer
        </label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          required
          defaultValue={meeting?.presiding ?? ""}
          aria-describedby="presiding-error"
          aria-invalid={Boolean(state.errors?.presiding?.length)}
          className={fieldClass}
        />
        <div id="presiding-error" aria-live="polite" className={errorClass}>
          {errorMessage("presiding")}
        </div>
      </div>

      {/* Conducting Officer */}
      <div>
        <label htmlFor="conducting" className="mb-2 block font-medium">
          Conducting Officer
        </label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          required
          defaultValue={meeting?.conducting ?? ""}
          aria-describedby="conducting-error"
          aria-invalid={Boolean(state.errors?.conducting?.length)}
          className={fieldClass}
        />
        <div id="conducting-error" aria-live="polite" className={errorClass}>
          {errorMessage("conducting")}
        </div>
      </div>

      {/* Opening Prayer */}
      <div>
        <label htmlFor="openingPrayer" className="mb-2 block font-medium">
          Opening Prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          required
          defaultValue={meeting?.openingPrayer ?? ""}
          aria-describedby="openingPrayer-error"
          aria-invalid={Boolean(state.errors?.openingPrayer?.length)}
          className={fieldClass}
        />
        <div id="openingPrayer-error" aria-live="polite" className={errorClass}>
          {errorMessage("openingPrayer")}
        </div>
      </div>

      {/* Closing Prayer */}
      <div>
        <label htmlFor="closingPrayer" className="mb-2 block font-medium">
          Closing Prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          required
          defaultValue={meeting?.closingPrayer ?? ""}
          aria-describedby="closingPrayer-error"
          aria-invalid={Boolean(state.errors?.closingPrayer?.length)}
          className={fieldClass}
        />
        <div id="closingPrayer-error" aria-live="polite" className={errorClass}>
          {errorMessage("closingPrayer")}
        </div>
      </div>

      {/* Opening Hymn */}
      <fieldset className="space-y-4 rounded border p-4">
        <legend className="font-semibold text-green-900">
          Opening Hymn
        </legend>

        <div>
          <label htmlFor="openingHymnNumber" className="mb-2 block font-medium">
            Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting?.openingHymn.number ?? ""}
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(state.errors?.openingHymnNumber?.length)}
            className={fieldClass}
          />
          <div id="openingHymnNumber-error" aria-live="polite" className={errorClass}>
            {errorMessage("openingHymnNumber")}
          </div>
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="mb-2 block font-medium">
            Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            required
            defaultValue={meeting?.openingHymn.title ?? ""}
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(state.errors?.openingHymnTitle?.length)}
            className={fieldClass}
          />
          <div id="openingHymnTitle-error" aria-live="polite" className={errorClass}>
            {errorMessage("openingHymnTitle")}
          </div>
        </div>
      </fieldset>

      {/* Sacrament Hymn */}
      <fieldset className="space-y-4 rounded border p-4">
        <legend className="font-semibold text-green-900">
          Sacrament Hymn
        </legend>

        <div>
          <label htmlFor="sacramentHymnNumber" className="mb-2 block font-medium">
            Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting?.sacramentHymn.number ?? ""}
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(state.errors?.sacramentHymnNumber?.length)}
            className={fieldClass}
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" className={errorClass}>
            {errorMessage("sacramentHymnNumber")}
          </div>
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="mb-2 block font-medium">
            Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            required
            defaultValue={meeting?.sacramentHymn.title ?? ""}
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(state.errors?.sacramentHymnTitle?.length)}
            className={fieldClass}
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" className={errorClass}>
            {errorMessage("sacramentHymnTitle")}
          </div>
        </div>
      </fieldset>

      {/* Closing Hymn */}
      <fieldset className="space-y-4 rounded border p-4">
        <legend className="font-semibold text-green-900">
          Closing Hymn
        </legend>

        <div>
          <label htmlFor="closingHymnNumber" className="mb-2 block font-medium">
            Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting?.closingHymn.number ?? ""}
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(state.errors?.closingHymnNumber?.length)}
            className={fieldClass}
          />
          <div id="closingHymnNumber-error" aria-live="polite" className={errorClass}>
            {errorMessage("closingHymnNumber")}
          </div>
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="mb-2 block font-medium">
            Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            required
            defaultValue={meeting?.closingHymn.title ?? ""}
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(state.errors?.closingHymnTitle?.length)}
            className={fieldClass}
          />
          <div id="closingHymnTitle-error" aria-live="polite" className={errorClass}>
            {errorMessage("closingHymnTitle")}
          </div>
        </div>
      </fieldset>

      {/* Speakers and Musical Numbers */}
      <fieldset className="space-y-4 rounded border p-4">
        <legend className="font-semibold text-green-900">
          Speakers and Musical Numbers
        </legend>

        <div>
          <label htmlFor="speakerName" className="mb-2 block font-medium">
            Speaker or Performer Name
          </label>
          <input
            id="speakerName"
            name="speakerName"
            type="text"
            defaultValue={meeting?.speakers[0]?.name ?? ""}
            aria-describedby="speakerName-error"
            aria-invalid={Boolean(state.errors?.speakerName?.length)}
            className={fieldClass}
          />
          <div id="speakerName-error" aria-live="polite" className={errorClass}>
            {errorMessage("speakerName")}
          </div>
        </div>

        <div>
          <label htmlFor="speakerTopic" className="mb-2 block font-medium">
            Topic or Musical Selection
          </label>
          <input
            id="speakerTopic"
            name="speakerTopic"
            type="text"
            defaultValue={meeting?.speakers[0]?.topic ?? ""}
            aria-describedby="speakerTopic-error"
            aria-invalid={Boolean(state.errors?.speakerTopic?.length)}
            className={fieldClass}
          />
          <div id="speakerTopic-error" aria-live="polite" className={errorClass}>
            {errorMessage("speakerTopic")}
          </div>
        </div>

        <div>
          <label htmlFor="speakerType" className="mb-2 block font-medium">
            Participation Type
          </label>
          <select
            id="speakerType"
            name="speakerType"
            defaultValue={meeting?.speakers[0]?.type ?? "speaker"}
            aria-describedby="speakerType-error"
            aria-invalid={Boolean(state.errors?.speakerType?.length)}
            className={fieldClass}
          >
            <option value="speaker">Speaker</option>
            <option value="musical-number">Musical Number</option>
          </select>
          <div id="speakerType-error" aria-live="polite" className={errorClass}>
            {errorMessage("speakerType")}
          </div>
        </div>
      </fieldset>

      {/* Announcements */}
      <div>
        <label htmlFor="announcements" className="mb-2 block font-medium">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={meeting?.announcements?.join("\n") ?? ""}
          aria-describedby="announcements-error"
          aria-invalid={Boolean(state.errors?.announcements?.length)}
          className={fieldClass}
        />
        <div id="announcements-error" aria-live="polite" className={errorClass}>
          {errorMessage("announcements")}
        </div>
      </div>

      {/* Ward Business */}
      <div>
        <label htmlFor="wardBusiness" className="mb-2 block font-medium">
          Ward Business (one item per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={4}
          defaultValue={
            meeting?.wardBusiness
              .map((item) => item.description)
              .join("\n") ?? ""
          }
          aria-describedby="wardBusiness-error"
          aria-invalid={Boolean(state.errors?.wardBusiness?.length)}
          className={fieldClass}
        />
        <div id="wardBusiness-error" aria-live="polite" className={errorClass}>
          {errorMessage("wardBusiness")}
        </div>
      </div>

      {/* Stake Business */}
      <div>
        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            value="true"
            defaultChecked={meeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
            aria-invalid={Boolean(state.errors?.stakeBusiness?.length)}
            className="h-4 w-4"
          />
          <label htmlFor="stakeBusiness" className="font-medium">
            Include Stake Business
          </label>
        </div>
        <div id="stakeBusiness-error" aria-live="polite" className={errorClass}>
          {errorMessage("stakeBusiness")}
        </div>
      </div>

      {/* General Form Message */}
      {state.message && (
        <div role="alert" className="text-sm text-red-700">
          {state.message}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving Meeting..."
            : isEditing
              ? "Update Meeting"
              : "Create Meeting"}
        </button>
      </div>
    </form>
  );
}
