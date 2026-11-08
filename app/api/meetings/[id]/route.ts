
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) {
    return NextResponse.json(
      { error: "Invalid meeting ID" },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(Number(id));

  if (!meeting) {
    return NextResponse.json(
      { error: "Meeting not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting, { status: 200 });
}
