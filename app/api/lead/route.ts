import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    name,
    email,
    firmSize,
    painPoint,
    source,
    partial,
    software,
    otherSoftware,
    closeDays,
    currentProcess,
    painPoints,
    otherPain,
    role,
  } = body as Record<string, unknown>;

  const emailStr = typeof email === "string" ? email.trim() : "";

  // Partial (best-effort, exit-before-completion) submissions from the
  // intake wizard skip validation entirely — there may be no email yet.
  if (!partial) {
    if (!emailStr) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(emailStr)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
  }

  const lead = {
    name: typeof name === "string" && name.trim() ? name.trim() : "(not provided)",
    email: emailStr || "(not provided)",
    firmSize,
    painPoint,
    source: source || "homepage",
    partial: Boolean(partial),
    software,
    otherSoftware,
    closeDays,
    currentProcess,
    painPoints,
    otherPain,
    role,
  };

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Placeholder — set LEAD_NOTIFICATION_EMAIL before launch
    const to = process.env.LEAD_NOTIFICATION_EMAIL || "founders@example.com";

    await resend.emails.send({
      from: "Meridian Leads <leads@example.com>",
      to,
      subject: `New lead (${lead.source}${lead.partial ? ", partial" : ""}): ${lead.name}`,
      text: [
        `Source: ${lead.source}${lead.partial ? " (partial — exited before completing)" : ""}`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Landing page: ${lead.role || "(homepage / not role-specific)"}`,
        `Firm size: ${lead.firmSize || "(not provided)"}`,
        `Software: ${lead.software || "(not provided)"}${lead.otherSoftware ? ` (${lead.otherSoftware})` : ""}`,
        `Close time: ${lead.closeDays ? `${lead.closeDays} business days` : "(not provided)"}`,
        `Current process: ${lead.currentProcess || "(not provided)"}`,
        `Pain points: ${Array.isArray(lead.painPoints) && lead.painPoints.length ? lead.painPoints.join(", ") : "(not provided)"}${lead.otherPain ? ` (${lead.otherPain})` : ""}`,
        `Pain point (free text): ${lead.painPoint || "(not provided)"}`,
      ].join("\n"),
    });
  } else {
    // TODO: wire up email delivery — set RESEND_API_KEY and LEAD_NOTIFICATION_EMAIL to send leads via Resend.
    console.log("[lead]", lead);
  }

  return NextResponse.json({ ok: true });
}
