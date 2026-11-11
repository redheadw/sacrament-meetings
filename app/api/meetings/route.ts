
import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";

import {
  getMeetings,
  getMeetingByDate,
} from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  // Wait for an incoming request before accessing
  // dynamic URL search parameters.
  await connection();

  try {
    const date = request.nextUrl.searchParams.get("date");

    // Search for a specific meeting date
    if (date) {
      const meeting = await getMeetingByDate(date);

      return NextResponse.json(
        meeting ? [meeting] : []
      );
    }

    // Get meetings from Neon
    const meetings = await getMeetings();

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);

    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}
