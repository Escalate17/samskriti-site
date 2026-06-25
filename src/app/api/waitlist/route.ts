import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Placeholder: log to console. Wire to your own storage later.
    // No third-party trackers, no external API calls — consistent with the privacy story.
    console.log(`[waitlist] ${new Date().toISOString()} — ${email}`);

    return NextResponse.json({ success: true, email });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
