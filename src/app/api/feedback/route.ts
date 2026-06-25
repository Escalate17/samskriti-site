import { NextResponse } from "next/server";

// Single endpoint for the "test user / would you pay" section.
// Stores one row per submission: { email, pay_answer, amount, timestamp }.
//
// Storage: Supabase (free tier). Set these env vars in Vercel (or .env.local):
//   SUPABASE_URL                 e.g. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    Project Settings → API → service_role key (server-only)
//   SUPABASE_TABLE               optional, defaults to "feedback"
// If the env vars are absent, it gracefully logs to the server console instead,
// so local dev works with zero setup.

const PAY_ANSWERS = ["yes", "no", "maybe"] as const;
type PayAnswer = (typeof PAY_ANSWERS)[number];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const payAnswer = String(body.pay_answer || "").toLowerCase() as PayAnswer;
    const rawAmount = body.amount;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!PAY_ANSWERS.includes(payAnswer)) {
      return NextResponse.json(
        { error: "pay_answer must be yes, no, or maybe" },
        { status: 400 }
      );
    }

    // amount is optional; coerce to a number or null
    let amount: number | null = null;
    if (rawAmount !== undefined && rawAmount !== null && rawAmount !== "") {
      const n = Number(rawAmount);
      amount = Number.isFinite(n) && n >= 0 ? n : null;
    }

    const record = {
      email,
      pay_answer: payAnswer,
      amount,
      timestamp: new Date().toISOString(),
    };

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const table = process.env.SUPABASE_TABLE || "feedback";

    if (url && key) {
      const res = await fetch(`${url}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error(`[feedback] supabase insert failed: ${res.status} ${detail}`);
        return NextResponse.json({ error: "Could not store submission" }, { status: 502 });
      }
    } else {
      // No backend configured — log so local dev still works.
      console.log(`[feedback] ${record.timestamp} — ${JSON.stringify(record)}`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
