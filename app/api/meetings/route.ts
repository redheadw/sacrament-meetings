
import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  const meetings: SacramentMeeting[] = getMeetings();

  const results = date
    ? meetings.filter((meeting) => meeting.date === date)
    : meetings;

  return NextResponse.json(results);
}
