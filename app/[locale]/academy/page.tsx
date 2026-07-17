import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import LedgerCard from "@/components/LedgerCard";
import ArchivalLabel from "@/components/ArchivalLabel";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Academy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AcademyPage() {
  const t = await getTranslations("Academy");
  const tracks = [
    { title: t("track1Title"), body: t("track1Body") },
    { title: t("track2Title"), body: t("track2Body") },
    { title: t("track3Title"), body: t("track3Body") },
  ];

  return (
    <main className="min-h-screen bg-paper">
      <Nav talentNav />

      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <ArchivalLabel className="mb-3 block">{t("label")}</ArchivalLabel>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[56px] md:leading-[1.1]">
              {t("headline")}
            </h1>
            {/*
              v1 program description — placeholder structure only. Needs
              real curriculum details (modules, hours, certifying body if
              any, renewal requirements) confirmed before launch.
            */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              {t("intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ArchivalLabel className="mb-3 block text-center">
              {t("tracksLabel")}
            </ArchivalLabel>
          </Reveal>
          <div className="mt-10 space-y-4">
            {tracks.map((track) => (
              <Reveal key={track.title}>
                <LedgerCard className="p-6">
                  <h3 className="text-base font-semibold text-ink">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {track.body}
                  </p>
                </LedgerCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/join#apply" className="text-sm text-accent underline">
              {t("backToJoin")}
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
