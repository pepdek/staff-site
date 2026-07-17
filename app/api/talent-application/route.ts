import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Talent-side counterpart to /api/lead — kept as a separate endpoint since
// this is the other side of the marketplace (candidates, not clients).
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    resumeLink,
    role,
    experience,
    software,
    otherSoftware,
    timezone,
    availability,
    source,
  } = body as Record<string, unknown>;

  const emailStr = typeof email === "string" ? email.trim() : "";

  if (!emailStr) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(emailStr)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const application = {
    name: typeof name === "string" && name.trim() ? name.trim() : "(not provided)",
    email: emailStr,
    phone: phone || "(not provided)",
    resumeLink: resumeLink || "(not provided)",
    role,
    experience,
    software,
    otherSoftware,
    timezone,
    availability,
    source: source || "talent-wizard",
  };

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Placeholder — set TALENT_NOTIFICATION_EMAIL before launch
    const to = process.env.TALENT_NOTIFICATION_EMAIL || "talent@example.com";

    await resend.emails.send({
      from: "Meridian Talent <talent@example.com>",
      to,
      subject: `New talent application: ${application.name}`,
      text: [
        `Source: ${application.source}`,
        `Name: ${application.name}`,
        `Email: ${application.email}`,
        `Phone: ${application.phone}`,
        `Resume/portfolio link: ${application.resumeLink}`,
        `Role: ${application.role || "(not provided)"}`,
        `Experience: ${application.experience || "(not provided)"}`,
        `Software: ${Array.isArray(application.software) && application.software.length ? application.software.join(", ") : "(not provided)"}${application.otherSoftware ? ` (${application.otherSoftware})` : ""}`,
        `Timezone availability: ${application.timezone || "(not provided)"}`,
        `Current availability: ${application.availability || "(not provided)"}`,
      ].join("\n"),
    });
  } else {
    // TODO: wire up email delivery — set RESEND_API_KEY and TALENT_NOTIFICATION_EMAIL to send applications via Resend.
    console.log("[talent-application]", application);
  }

  return NextResponse.json({ ok: true });
}
