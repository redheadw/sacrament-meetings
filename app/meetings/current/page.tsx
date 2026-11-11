
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetingByDate } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  // Read the current date at request time.
  await connection();

  const today = new Date();

  // Find the most recent Sunday.
  const daysSinceSunday = today.getDay();

  today.setDate(today.getDate() - daysSinceSunday);

  // Format the date as YYYY-MM-DD.
  const sundayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const meeting = getMeetingByDate(sundayDate);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  redirect("/meetings");
}
