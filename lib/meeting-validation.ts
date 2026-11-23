
import { z } from "zod";

export const MeetingFormSchema = z.object({
  // Meeting details
  date: z.iso.date(),

  meetingType: z.enum([
    "testimony",
    "regular",
    "stake",
    "general",
  ]),

  presiding: z
    .string()
    .trim()
    .min(1, "Presiding officer is required."),

  conducting: z
    .string()
    .trim()
    .min(1, "Conducting officer is required."),

  openingPrayer: z
    .string()
    .trim()
    .min(1, "Opening prayer is required."),

  closingPrayer: z
    .string()
    .trim()
    .min(1, "Closing prayer is required."),

  // Opening Hymn
  openingHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive("Opening hymn number must be positive."),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, "Opening hymn title is required."),

  // Sacrament Hymn
  sacramentHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive("Sacrament hymn number must be positive."),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, "Sacrament hymn title is required."),

  // Closing Hymn
  closingHymnNumber: z.coerce
    .number<number>()
    .int()
    .positive("Closing hymn number must be positive."),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, "Closing hymn title is required."),

  // Speaker or musical number
  speakerName: z.string().trim(),

  speakerTopic: z.string().trim(),

  speakerType: z.enum([
    "speaker",
    "musical-number",
  ]),

  // Announcements and ward business
  announcements: z.string().trim(),

  wardBusiness: z.string().trim(),

  // Checkbox is absent from FormData when unchecked
  stakeBusiness: z.enum(["true"]).optional(),
});
