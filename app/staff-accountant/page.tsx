import type { Metadata } from "next";
import RolePageContent from "@/components/RolePageContent";

export const metadata: Metadata = {
  title: "Outsource a Staff Accountant for Month-End Close — Meridian",
  description:
    "Outsource your staff accountant role to a dedicated hire who works your business hours — month-end close, journal entries, and close packages, without the weekend scramble.",
  alternates: { canonical: "/staff-accountant" },
  openGraph: {
    title:
      "Month-end close eating your weekends? Add a staff accountant who works your hours.",
    description:
      "A dedicated, timezone-matched staff accountant — month-end close, journal entry prep, supporting schedules, close package delivery. Same price as Philippines-based providers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Month-end close eating your weekends? Add a staff accountant who works your hours.",
    description:
      "A dedicated, timezone-matched staff accountant for month-end close. Same price as Philippines-based providers.",
  },
};

const painPoints = [
  "Month-end close routinely slips past day 5",
  "Journal entries reviewed too late to catch errors",
  "No coverage during PTO or busy season overflow",
];

const tasks = [
  "Month-end close",
  "Journal entry preparation",
  "Supporting schedules",
  "Close package delivery",
];

const faqs = [
  {
    q: "Do they work under our review, or independently?",
    a: "They prepare, your team reviews and signs off — same control model as an in-house junior hire.",
  },
  {
    q: "Can they follow our existing close checklist?",
    a: "Yes — we build the engagement around your current close process and checklist rather than replacing it.",
  },
  {
    q: "What happens during our busiest close of the year?",
    a: "Your dedicated staff accountant is yours full-time under the Standard and Firm plans, so busy-season volume doesn't compete with other clients' close work.",
  },
];

export default function StaffAccountantPage() {
  return (
    <RolePageContent
      role="staff-accountant"
      heroHeadline="Month-end close eating your weekends? Add a staff accountant who works your hours."
      painPoints={painPoints}
      tasks={tasks}
      faqs={faqs}
    />
  );
}
