import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import LedgerCard from "@/components/LedgerCard";
import ArchivalLabel from "@/components/ArchivalLabel";
import TalentWizard from "@/components/TalentWizard";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Join");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function JoinPage() {
  const t = await getTranslations("Join");
  const differentiators = [
    t("differentiator1"),
    t("differentiator2"),
    t("differentiator3"),
  ];

  return (
    <main className="min-h-screen bg-paper">
      <Nav talentNav />

      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              {t("heroHeadline")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              {t("heroSubheadline")}
            </p>
            <a
              href="#apply"
              className="btn-primary mt-8 inline-block rounded-lg px-6 py-3 text-base font-medium"
            >
              {t("heroCta")}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              {t("differentiatorsLabel")}
            </ArchivalLabel>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {differentiators.map((point) => (
              <Reveal key={point}>
                <LedgerCard className="h-full p-8">
                  <p className="text-base font-medium text-ink">{point}</p>
                </LedgerCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              {t("academyLabel")}
            </ArchivalLabel>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("academyHeadline")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-ink-muted">
              {t("academyTeaser")}
            </p>
            <p className="mt-4 text-center">
              <Link href="/academy" className="text-sm text-accent underline">
                {t("academyLink")}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="px-6 py-28">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {t("applicationHeadline")}
            </h2>
            <p className="mt-3 text-center text-ink-muted">
              {t("applicationSubheadline")}
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <TalentWizard />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
