import Image from "next/image";
import type { Metadata } from "next";
import { Ear, HeartPulse, UsersRound } from "lucide-react";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { ProjectChapterNavigation } from "@/components/projects/ProjectChapterNavigation";
import { ProjectFooterNavigation } from "@/components/projects/ProjectFooterNavigation";
import styles from "./freeclips.module.css";

export const metadata: Metadata = {
  title: "FreeClips D | Huilin Shen",
  description:
    "An exploratory Huawei HMI Lab concept bringing jewellery-inspired open-ear audio and a potential personal wellness experience together.",
};

const chapters = [
  ["Overview", "overview"],
  ["Research", "research"],
  ["Concept", "concept"],
  ["Design Exploration", "exploration"],
  ["Outcome", "outcome"],
] as const;

const insights = [
  {
    number: "01",
    title: "Wellness without extra effort",
    text: "Continuous awareness is most useful when it does not become another task. The proposal therefore favoured passive collection with the option to check in deliberately.",
  },
  {
    number: "02",
    title: "A more discreet wearable",
    text: "Competitor research pointed towards jewellery-like forms and long-wear comfort. A light ear clip offered a different option from another wrist-based device.",
  },
  {
    number: "03",
    title: "Meaning over more data",
    text: "The consumer question was ‘so what?’ Insights needed to explain patterns in plain language and suggest useful next steps, with clear control over personal data.",
  },
];

const marketSignals = [
  {
    value: "79%",
    label: "of UK consumers consider wellness a top or important priority",
    source: "McKinsey, 2025",
    href: "https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/future-of-wellness-trends",
    icon: HeartPulse,
  },
  {
    value: "$47.1B",
    label: "estimated global hearables market in 2026",
    source: "Grand View Research, 2026",
    href: "https://www.grandviewresearch.com/industry-analysis/hearables-market-report",
    icon: Ear,
  },
  {
    value: "41%+",
    label: "of annual US wellness spending comes from Gen Z and millennials",
    source: "McKinsey, 2025",
    href: "https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/future-of-wellness-trends",
    icon: UsersRound,
  },
];

const conceptDirections = [
  {
    title: "Jewellery-led form",
    text: "A small, lightweight lobe clip with an elegant finish and proposed skin-friendly materials for comfortable everyday wear.",
  },
  {
    title: "Audio that changes roles",
    text: "The earbud supports open-ear listening; when audio is not needed, its end could hang like an earring.",
  },
  {
    title: "Discreet control",
    text: "Passive collection was proposed alongside optional press-to-track, tactile and voice input, and subtle audio or haptic cues.",
  },
  {
    title: "Wellness with context",
    text: "Future sensing and AI analysis could turn patterns into timely, practical guidance, subject to technical and clinical validation.",
  },
];

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="grid content-start gap-5">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a5a6]">
        {number}
      </p>
      <h2 className="max-w-[800px] text-[36px] font-normal leading-[1.08] tracking-[-0.045em] text-white md:text-[54px]">
        {title}
      </h2>
    </div>
  );
}

export default function FreeClipsPage() {
  return (
    <main className={`${styles.page} min-h-screen overflow-x-clip bg-black text-white`}>
      <GlobalNavigation tone="dark" className="relative z-50 bg-black" />
      <ProjectChapterNavigation chapters={chapters} tone="dark" accent="#d2adb0" />

      <article>
        <section id="overview" className="bg-black px-5 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 pl-6 md:pl-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:pl-28">
            <div className="grid max-w-[570px] gap-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a5a6]">
                01 / Project Overview · Huawei HMI Lab
              </p>
              <div className="grid gap-5">
                <h1 className="text-[58px] font-normal leading-[0.95] tracking-[-0.07em] md:text-[86px] lg:text-[64px] xl:text-[92px] 2xl:text-[104px]">
                  FreeClips D
                </h1>
                <p className="max-w-[550px] text-[20px] leading-snug tracking-[-0.025em] text-white/75 md:text-[24px]">
                  An ear-worn concept where open-ear audio meets everyday wellness.
                </p>
              </div>
              <div className="grid max-w-[560px] gap-4 text-[16px] leading-relaxed text-white/55 md:text-[18px]">
                <p>
                  Developed at Huawei HMI Lab, the team proposal builds on FreeClip&apos;s jewellery-inspired form to explore how a familiar audio accessory might also support passive, non-invasive wellness sensing and contextual AI guidance.
                </p>
                <p>
                  The name extends Huawei WATCH D, a blood-pressure-monitoring watch with a medical focus. For this concept, D can mean Doctor or Diagnosis, reflecting its proposed monitoring role.
                </p>
                <p>
                  I contributed market and user research, product ideation, form exploration, and 3D modelling and rendering. This is an early-stage concept, not a released or clinically validated device.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                <span>Wearable</span>
                <span>Research</span>
                <span>3D visualisation</span>
              </div>
            </div>
            <figure className="min-w-0">
              <Image
                src="/projects/freeclips/form-detail.webp"
                alt="Close-up 3D render showing the FreeClips D concept worn on an ear"
                width={2400}
                height={1800}
                priority
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="h-auto w-full"
              />
              <figcaption className="mt-3 text-[13px] text-white/40">Concept render · ear-worn form and finish</figcaption>
            </figure>
          </div>
        </section>

        <section id="research" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid w-full max-w-[1280px] gap-12 pl-6 md:pl-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pl-28">
            <div className="grid content-start gap-6">
              <SectionHeading number="02" title="Research & Opportunity" />
              <p className="max-w-[490px] text-[16px] leading-relaxed text-white/55 md:text-[18px]">
                The proposal compared wellness habits, hearables and early health-focused earwear. It identified a gap between devices that collect more measurements and accessories people would choose to wear throughout the day. I helped translate those signals into three requirements: low effort, discreet form and useful interpretation.
              </p>
            </div>
            <div className="grid content-start">
              {insights.map((insight) => (
                <div key={insight.number} className="grid gap-3 border-t border-white/15 py-6 md:grid-cols-[56px_1fr] md:gap-5 md:py-8">
                  <span className="font-mono text-[12px] text-[#c5a5a6]">{insight.number}</span>
                  <div className="grid gap-2">
                    <h3 className="text-[23px] leading-tight tracking-[-0.03em] md:text-[27px]">{insight.title}</h3>
                    <p className="max-w-[550px] text-[16px] leading-relaxed text-white/50">{insight.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/35">Selected market context</p>
              <div className="grid border-y border-white/15 md:grid-cols-3">
                {marketSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div key={signal.value} className="grid content-start gap-3 border-b border-white/15 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:py-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                      <Icon aria-hidden="true" className="h-6 w-6 text-[#c5a5a6]" strokeWidth={1.5} />
                      <p className="text-[39px] leading-none tracking-[-0.05em] text-white md:text-[45px]">{signal.value}</p>
                      <p className="max-w-[290px] text-[15px] leading-relaxed text-white/55">{signal.label}</p>
                      <a href={signal.href} target="_blank" rel="noopener noreferrer" className="w-fit text-[12px] text-white/35 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/70">
                        {signal.source}
                      </a>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-white/35">Published market figures; they do not describe FreeClips D performance or user testing.</p>
            </div>
          </div>
        </section>

        <section id="concept" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 border-t border-white/10 pt-8 pl-6 md:pl-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pl-28">
            <SectionHeading number="03" title="Product Concept" />
            <div className="grid content-start gap-6 text-[17px] leading-relaxed text-white/60 md:text-[19px]">
              <p>The team proposal brought four design directions together:</p>
              <ul className="grid border-t border-white/15">
                {conceptDirections.map((direction) => (
                  <li key={direction.title} className="grid grid-cols-[10px_1fr] gap-4 border-b border-white/15 py-5">
                    <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-[#c5a5a6]" />
                    <p><strong className="font-medium text-white">{direction.title}.</strong> {direction.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="exploration" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid w-full max-w-[1280px] gap-10 pl-6 md:gap-14 md:pl-10 lg:pl-28">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <SectionHeading number="04" title="Design Exploration & 3D Visualization" />
              <p className="max-w-[680px] text-[17px] leading-relaxed text-white/55 md:text-[19px]">
                My work moved the direction from a brief into a visible product form. I explored the relationship between the ear clip and audio element, then modelled and rendered the concept in 3D to communicate its proportions, finish and placement. The renders gave the team a concrete form to discuss and refine.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-6">
              <figure className="grid content-start gap-3">
                <div className="relative aspect-[6/5] overflow-hidden bg-black">
                  <Image
                    src="/projects/freeclips/on-ear.webp"
                    alt="Front-facing 3D render showing the FreeClips D concept worn on both ears"
                    fill
                    sizes="(max-width: 767px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-[13px] text-white/40">FreeClips D · 3D concept visualisation</figcaption>
              </figure>
              <figure className="grid content-start gap-3">
                <div className="relative aspect-[6/5] overflow-hidden bg-black">
                  <Image
                    src="/projects/freeclips/huawei-freeclip-product.png"
                    alt="Huawei FreeClip earbud worn by a person, shown as a product reference"
                    fill
                    sizes="(max-width: 767px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-[13px] text-white/40">Huawei FreeClip · existing product reference</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="outcome" className="px-5 pb-10 pt-20 md:px-10 md:pt-28">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 border-t border-white/10 pt-8 pl-6 md:pl-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pl-28">
            <SectionHeading number="05" title="Outcome" />
            <div className="grid content-start gap-5 text-[17px] leading-relaxed text-white/60 md:text-[19px]">
              <p>
                FreeClips D proposes a way to extend FreeClip beyond audio towards a more integrated personal wellness experience. Huawei&apos;s European Research Institute expressed interest in further development and potential commercialisation.
              </p>
              <p>
                Next steps would be to validate sensing feasibility, comfort and ergonomics with specialists and users, then refine the product form and experience. For me, the project connected research-led opportunity finding with physical design and 3D visualisation.
              </p>
            </div>
          </div>
        </section>
      </article>

      <footer className="w-full bg-black px-5 pb-12 pt-44 md:px-10 md:pb-16 md:pt-52">
        <div className="mx-auto w-full max-w-[1280px]">
          <ProjectFooterNavigation current="freeclips" tone="dark" />
        </div>
      </footer>
    </main>
  );
}
