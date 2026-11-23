
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

import { MeetingFormSchema } from "@/lib/meeting-validation";
import type { State } from "@/lib/meeting-form-state";
import type { SacramentMeeting } from "@/lib/types";

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from "@/lib/meetings-db";

type MeetingFormData = z.infer<typeof MeetingFormSchema>;

function validateMeeting(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),

    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),

    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),

    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),

    speakerName: formData.get("speakerName"),
    speakerTopic: formData.get("speakerTopic"),
    speakerType: formData.get("speakerType"),

    announcements: formData.get("announcements"),
    wardBusiness: formData.get("wardBusiness"),
    stakeBusiness: formData.get("stakeBusiness") ?? undefined,
  });
}

function validateSpeaker(data: MeetingFormData): State | null {
  if (
    (data.speakerName && !data.speakerTopic) ||
    (!data.speakerName && data.speakerTopic)
  ) {
    return {
      errors: {
        speakerName: !data.speakerName
          ? ["Speaker name is required when a topic is entered."]
          : undefined,
        speakerTopic: !data.speakerTopic
          ? ["Speaker topic is required when a name is entered."]
          : undefined,
      },
      message: "Please complete the speaker information.",
    };
  }

  return null;
}

function buildMeeting(
  data: MeetingFormData
): Omit<SacramentMeeting, "id"> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    openingPrayer: data.openingPrayer,
    closingPrayer: data.closingPrayer,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    speakers:
      data.speakerName && data.speakerTopic
        ? [
            {
              name: data.speakerName,
              topic: data.speakerTopic,
              type: data.speakerType,
            },
          ]
        : [],

    announcements: data.announcements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),

    wardBusiness: data.wardBusiness
      .split("\n")
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),

    stakeBusiness: data.stakeBusiness === "true",
  };
}

// CREATE MEETING
export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = validateMeeting(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const data = validatedFields.data;
  const speakerError = validateSpeaker(data);

  if (speakerError) {
    return speakerError;
  }

  try {
    await addMeeting(buildMeeting(data));
  } catch (error) {
    console.error("Failed to create meeting:", error);

    return {
      errors: {},
      message: "Unable to create the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// UPDATE MEETING
export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      errors: {},
      message: "Invalid meeting ID.",
    };
  }

  const validatedFields = validateMeeting(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const data = validatedFields.data;
  const speakerError = validateSpeaker(data);

  if (speakerError) {
    return speakerError;
  }

  try {
    const updatedMeeting = await updateMeetingInDb(
      id,
      buildMeeting(data)
    );

    if (!updatedMeeting) {
      return {
        errors: {},
        message: "Meeting not found.",
      };
    }
  } catch (error) {
    console.error("Failed to update meeting:", error);

    return {
      errors: {},
      message: "Unable to update the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);

  redirect(`/meetings/${id}`);
}

// DELETE MEETING
export async function deleteMeeting(
  id: number
): Promise<void> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  const deleted = await deleteMeetingInDb(id);

  if (!deleted) {
    throw new Error("Meeting not found.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);

  redirect("/meetings");
}
