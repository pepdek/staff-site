import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, firmSize, painPoint, source } = body as Record<string, string>;

  if (!email?.trim()) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const lead = {
    name: name?.trim() || "(not provided)",
    email: email.trim(),
    firmSize,
    painPoint,
    source: source || "homepage",
  };

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Placeholder — set LEAD_NOTIFICATION_EMAIL before launch
    const to = process.env.LEAD_NOTIFICATION_EMAIL || "founders@example.com";

    await resend.emails.send({
      from: "Meridian Leads <leads@example.com>",
      to,
      subject: `New lead (${lead.source}): ${lead.name}`,
      text: `Source: ${lead.source}\nName: ${lead.name}\nEmail: ${lead.email}\nFirm size: ${lead.firmSize || "(not provided)"}\nPain point: ${lead.painPoint || "(not provided)"}`,
    });
  } else {
    // TODO: wire up email delivery — set RESEND_API_KEY and LEAD_NOTIFICATION_EMAIL to send leads via Resend.
    console.log("[lead]", lead);
  }

  return NextResponse.json({ ok: true });
}
