
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Validate the meeting ID
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) {
      return NextResponse.json(
        { error: "Invalid meeting ID" },
        { status: 400 }
      );
    }

    // Wait for Neon to retrieve the meeting
    const meeting = await getMeetingById(Number(id));

    if (!meeting) {
      return NextResponse.json(
        { error: "Meeting not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.error("Error fetching meeting:", error);

    return NextResponse.json(
      { error: "Failed to fetch meeting" },
      { status: 500 }
    );
  }
}
