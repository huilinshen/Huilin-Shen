import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { BodyClockCaseStudy } from "@/components/projects/BodyClockCaseStudy";
import { CalendarFlipbook } from "@/components/projects/CalendarFlipbook";
import { CaseStudySubAccordion } from "@/components/projects/CaseStudySubAccordion";
import { ResearchProcessAccordion } from "@/components/projects/ResearchProcessAccordion";
import { InternshipProjectsCaseStudy } from "@/components/projects/InternshipProjectsCaseStudy";
import { ProjectFooterNavigation } from "@/components/projects/ProjectFooterNavigation";
import { ProjectChapterNavigation } from "@/components/projects/ProjectChapterNavigation";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import gardenStyles from "./community-garden.module.css";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "internship-projects") redirect("/projects/skyline-ui");
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Huilin Shen",
    };
  }

  return {
    title: `${project.title} | Huilin Shen`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "internship-projects") redirect("/projects/skyline-ui");
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isBodyClock = project.slug === "generative-watch-face";
  const isCommunityGardens = project.slug === "community-gardens";
  const isInternshipProjects = project.slug === "skyline-ui";
  const communityProjectTitleClass =
    "w-full whitespace-nowrap text-[clamp(19px,5.6vw,78px)] font-normal leading-[0.96] tracking-[-0.065em] text-[#75A723]";
  const communityBodyClass =
    "text-[17px] font-normal leading-[1.65] text-[#4e4e4e] md:text-[18px]";
  const communityMetaClass =
    "text-[16px] font-normal leading-[1.55] text-neutral-500 md:text-[17px]";
  const communityH1Class =
    "text-[38px] font-normal leading-[1.08] tracking-[-0.05em] text-[#75A723] md:text-[54px]";
  const communityH3Class =
    "text-[23px] font-normal leading-[1.22] tracking-[-0.03em] text-black md:text-[28px]";

  if (isBodyClock) {
    return (
      <main className="min-h-screen overflow-x-clip bg-[#02040a] text-white">
        <article className="mx-auto grid w-full min-w-0 max-w-full gap-0 overflow-x-clip px-0">
          <div className="bg-black pb-6">
            <GlobalNavigation tone="dark" className="body-clock-header z-50" />
          </div>

          <BodyClockCaseStudy />

          <footer className="w-full bg-[linear-gradient(180deg,#02040a_0%,#060b18_100%)] px-5 pb-12 pt-44 md:px-10 md:pb-16 md:pt-52">
            <div className="mx-auto w-full max-w-[1280px]">
              <ProjectFooterNavigation current="generative-watch-face" tone="dark" />
            </div>
          </footer>
        </article>
      </main>
    );
  }

  if (isInternshipProjects) {
    return (
      <main className="min-h-screen bg-white text-[#0a0a0a]">
        <article className="mx-auto grid w-full gap-0 px-0">
          <GlobalNavigation className="z-50 mb-6" />

          <InternshipProjectsCaseStudy />

          <footer className="mx-auto grid w-full max-w-[1440px] bg-white px-5 pb-12 pt-[120px] md:px-8 md:pb-16 md:pt-[152px] lg:px-10 lg:pt-32 xl:px-12">
            <div className="mx-auto w-full max-w-[1280px]">
              <ProjectFooterNavigation current="skyline-ui" />
            </div>
          </footer>
        </article>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${isCommunityGardens ? `overflow-x-clip bg-white text-black ${gardenStyles.page}` : "bg-[#fffaf0] text-[#202018]"}`}>
      <ProjectChapterNavigation
        tone="light"
        accent={isCommunityGardens ? "#75A723" : project.accent}
        chapters={isCommunityGardens
          ? [["Outcome", "hero"], ["Research", "research"],
              ["Desk Research", "research-stage-1", true], ["Interview with Stakeholder", "research-stage-2", true],
              ["Participatory Workshop", "research-stage-3", true], ["Target Users", "research-stage-4", true],
              ["Ideation", "research-stage-5", true], ["Delivery", "research-stage-6", true],
              ["Reference", "research-reference", true]]
          : [["Hero", "hero"], ...project.sections.map((section, index) => [section.title, `section-${index}`] as const)]}
      />
      <GlobalNavigation />
      <article
        className={isCommunityGardens
          ? gardenStyles.article
          : "mx-auto grid w-full max-w-6xl gap-12 px-5 pt-8 md:px-8 md:pt-12 lg:px-10 xl:px-12"}
      >
        {project.details ? (
          <>
            {isCommunityGardens ? (
              <header id="hero" className="grid gap-10 py-8 md:py-14">
                <div className="grid gap-8">
                  <h1 className={communityProjectTitleClass}>
                    Community Gardens Forres
                  </h1>
                  <dl className={`grid gap-y-3 md:grid-cols-[90px_auto_1fr] md:gap-x-4 ${communityMetaClass}`}>
                    <dt>Duration</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>Jun-Aug 2024</dd>
                    <dt>Role</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>Individual Master&apos;s Graduation Project</dd>
                    <dt>Focus</dt>
                    <dd className="hidden md:block">|</dd>
                    <dd>UX Research · Stakeholder Mapping · Community Engagement</dd>
                  </dl>
                </div>

                <section className={`grid max-w-5xl gap-2 ${communityBodyClass}`}>
                  <h2 className={communityH3Class}>Overview</h2>
                  <p>
                    A UX project that helps community gardens attract young volunteers and address long-term funding and
                    labour challenges.
                  </p>
                </section>

                <div className="border-t border-[#75A723]" />

                <section className={`grid gap-10 md:grid-cols-3 md:gap-20 ${communityBodyClass}`}>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Challenge</h2>
                    <p>Lack of funding, volunteers, and youth engagement.</p>
                  </div>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Goal</h2>
                    <p>Bring more young people into community gardening.</p>
                  </div>
                  <div className="grid content-start gap-3">
                    <h2 className={communityH3Class}>Impact</h2>
                    <p>More volunteers, stronger communities, and a more sustainable future.</p>
                  </div>
                </section>

                <div className="border-t border-[#75A723]" />

                <section className={`grid gap-3 ${communityBodyClass}`}>
                  <h2 className={communityH3Class}>Solution</h2>
                  <div>
                    <p>
                      A multi-touchpoint experience designed to make gardening more accessible and engaging for young
                      people:
                    </p>
                    <ul className="mt-2 list-disc pl-8">
                      <li>Home Gardening Toolkit</li>
                      <li>Redesigned Community Signage</li>
                      <li>AR Gardening Experience</li>
                    </ul>
                  </div>
                </section>
              </header>
            ) : (
              <header id="hero" className="grid gap-10 py-8 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-14">
                <div className="grid min-h-[360px] content-between gap-8">
                  <div className="grid gap-8">
                    <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
                      {project.title} Forres
                    </h1>
                    <div className="grid gap-5 text-xl leading-relaxed text-[#202018]">
                      <p>{project.details.workType}</p>
                      <p>{project.details.dateRange}</p>
                    </div>
                  </div>

                  {project.details.stakeholder ? (
                    <p className="max-w-xl text-xl italic leading-relaxed text-[#202018]">
                      Stakeholders: {project.details.stakeholder.label}
                      <br />
                      <Link href={project.details.stakeholder.url}>
                        ({project.details.stakeholder.url})
                      </Link>
                    </p>
                  ) : null}
                </div>

                <div className="grid content-center gap-6 text-xl leading-9 text-[#202018]">
                  {project.details.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </header>
            )}

            <section className={isCommunityGardens ? "overflow-hidden bg-white" : "overflow-hidden rounded-lg border border-[#e3d6b5] bg-white shadow-[0_6px_0_#eadfca]"}>
              <Image
                src={project.cover}
                alt={`${project.title} final product cover`}
                width={1754}
                height={1241}
                className="h-auto w-full"
                priority
              />
            </section>

            {isCommunityGardens ? (
              <>
                <CalendarFlipbook />

                <section className="grid justify-items-start border-t border-neutral-200 py-14" aria-label="Map front">
                  <div className="grid w-full gap-3 overflow-hidden bg-white">
                    <Image
                      src="/projects/community-gardens/outputs/map-front.png"
                      alt="Community garden map front"
                      width={1684}
                      height={1190}
                      className="h-auto w-full"
                    />
                    <p className={`text-left ${communityBodyClass}`}>Map Front</p>
                    <Image
                      src="/projects/community-gardens/outputs/map-back.png"
                      alt="Community garden map back"
                      width={1684}
                      height={1190}
                      className="mt-8 h-auto w-full"
                    />
                    <div className="grid gap-2 pt-3 md:grid-cols-3">
                      <p className={`text-left ${communityBodyClass}`}>Map Back</p>
                      <p className={`text-left ${communityBodyClass}`}>
                        8-panel fold, pocket-sized when folded
                      </p>
                    </div>
                    <div className="grid gap-8 pb-10 pt-10 md:-mt-8 md:grid-cols-[1fr_auto] md:items-start">
                      <div className="grid gap-5">
                        <div className="grid gap-4 pt-12">
                          <h2 className={communityH1Class}>COMMUNITY GARDEN MAP</h2>
                          <div className="grid gap-2">
                            <h3 className={communityH3Class}>A Map</h3>
                            <p className={`max-w-5xl ${communityBodyClass}`}>
                              on the theme of Forres community garden, which shows the general location and gives the
                              contact information of the community garden.
                            </p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/projects/community-gardens/outputs/physical-map.png"
                        alt="Folded physical community garden map"
                        width={521}
                        height={463}
                        className="h-auto w-full justify-self-end md:w-[34vw] md:min-w-[420px] md:max-w-[560px] xl:max-w-[640px]"
                      />
                    </div>
                    <div className="grid gap-14 pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
                      <section className="grid content-start gap-10" aria-label="Street signs">
                        <div className="flex items-end md:aspect-[758/560]">
                          <Image
                            src="/projects/community-gardens/outputs/street-sign.png"
                            alt="Making and installing wooden street signs for community garden plants"
                            width={842}
                            height={534}
                            className="h-auto w-full"
                          />
                        </div>
                        <div className="grid gap-4">
                          <h2 className={communityH1Class}>
                            Street Signs
                          </h2>
                          <div className={`grid max-w-3xl gap-6 ${communityBodyClass}`}>
                            <p>
                              let passers-by to learn about the plant and information about related community gardens
                            </p>
                            <p>e.g. this rose bed is managed and maintained by Forres in Bloom.</p>
                          </div>
                        </div>
                      </section>

                      <section className="grid content-start gap-10" aria-label="Seed bags">
                        <div className="flex items-end md:aspect-[758/560]">
                          <Image
                            src="/projects/community-gardens/outputs/seed-bags.png"
                            alt="Front and back seed bag tag designs with QR codes"
                            width={758}
                            height={560}
                            className="h-auto w-full"
                          />
                        </div>
                        <div className="grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-start">
                          <div className="grid gap-4">
                            <h2 className={communityH1Class}>Seed Bags</h2>
                            <p className={`max-w-2xl ${communityBodyClass}`}>
                              Scan the QR code on the back to learn the growing instructions for that plant.
                            </p>
                          </div>
                          <Image
                            src="/projects/community-gardens/outputs/seed-bag-single.png"
                            alt="Folded carrot seed bag tag with ribbon"
                            width={602}
                            height={660}
                            className="-mt-6 h-auto w-full justify-self-end md:-mt-16 md:w-[92%]"
                          />
                        </div>
                      </section>
                    </div>
                    <section className="grid gap-5 pt-16" aria-labelledby="ar-gardening-market-title">
                      <div className="grid gap-2">
                        <h2
                          id="ar-gardening-market-title"
                          className={communityH1Class}
                        >
                          AR Gardening Market
                        </h2>
                        <p className={communityBodyClass}>
                          <strong className="font-black">Youtube link:</strong>{" "}
                          <em>https://youtu.be/mA_cTKQcZcg</em>
                        </p>
                      </div>
                      <Image
                        src="/projects/community-gardens/outputs/ar-gardening-market.png"
                        alt="AR gardening market poster and augmented garden scene collage"
                        width={1614}
                        height={898}
                        className="h-auto w-full"
                      />
                      <div className={`grid gap-x-12 gap-y-2 md:w-fit md:grid-cols-2 ${communityBodyClass}`}>
                        <div className="grid gap-2">
                          <p>☀️ Saturday, June 7th 2025</p>
                          <p>⏰ 10:00 AM - 1:00 PM</p>
                        </div>
                        <div className="grid gap-2">
                          <p>📍 Grant Park, Forres</p>
                          <p>💰 FREE to everyone</p>
                        </div>
                      </div>
                    </section>
                    <section className="grid gap-5 pt-16" aria-labelledby="storyboard-title">
                      <h2
                        id="storyboard-title"
                        className={communityH1Class}
                      >
                        Storyboard
                      </h2>
                      <Image
                        src="/projects/community-gardens/outputs/storyboard.png"
                        alt="Storyboard showing the community garden journey from scanning QR codes to joining the market"
                        width={1638}
                        height={1028}
                        className="h-auto w-full"
                      />
                    </section>
                  </div>
                </section>
              </>
            ) : null}
          </>
        ) : (
          <>
            <header className="grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-end">
              <div className="grid gap-5">
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ffe29a] px-3 py-1 text-sm font-medium uppercase tracking-[0.16em]">
                  <Sparkles size={14} /> UIUX case study
                </p>
                <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#5c5749]">{project.summary}</p>
                <div className="flex flex-wrap gap-2 text-sm font-medium text-[#5c5749]">
                  <span>{project.year}</span>
                  <span>/</span>
                  <span>{project.role}</span>
                  <span>/</span>
                  <span>{project.tags.join(", ")}</span>
                </div>
              </div>

              <section className="case-hero-visual" aria-label={`${project.title} visual preview`}>
                <div className="watch-face">
                  <div className="watch-time">10:42</div>
                  <div className="watch-rings">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="watch-complications">
                    <span>Move</span>
                    <span>Focus</span>
                    <span>Mood</span>
                  </div>
                </div>
                <div className="generator-panel">
                  <span>Intent</span>
                  <strong>Calm morning</strong>
                  <div />
                  <div />
                  <div />
                </div>
              </section>
            </header>

            <section className="grid gap-4 border-y border-[#e3d6b5] py-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Format</p>
                <p className="mt-2 text-xl font-medium">Scrolling product story</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Entry</p>
                <p className="mt-2 text-xl font-medium">Project page in Huilin Shen</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7a6b40]">Next asset</p>
                <p className="mt-2 text-xl font-medium">Replace preview with Figma exports</p>
              </div>
            </section>
          </>
        )}

        {isCommunityGardens ? (
          <ResearchProcessAccordion id="research">
            <div className="grid gap-16">
              <section className="w-full bg-white" aria-label="Research overview">
                <Image
                  src="/projects/community-gardens/outputs/research-bg.png"
                  alt="Community garden research overview for Forres Friends of Woods and Fields"
                  width={1684}
                  height={1152}
                  sizes="(min-width: 1440px) 1440px, 100vw"
                  unoptimized
                  className="h-auto w-full"
                />
              </section>

              <CaseStudySubAccordion id="research-stage-1" title="Stage1 Desk Research">
                <section
                  className="grid gap-16 bg-white text-[14px] font-normal leading-normal text-black md:text-[16px] xl:text-[18px]"
                  aria-label="Stage 1 desk research"
                >
                  <section className="grid max-w-5xl gap-5">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      About Forres
                    </h3>
                    <div className="grid gap-5">
                      <p>
                        Forres is a small town in northeastern Scotland, near the coast of the Moray Firth, known for
                        its beautiful scenery and nicknamed the &quot;flower of Scotland&quot;.
                      </p>
                      <p>
                        It has won a number of awards for its proliferation of floral displays, including Scotland in
                        Bloom and Keep Scotland Beautiful, not to mention the Queen&apos;s Award for Voluntary Service for
                        the teams who plant some 20,000 flowers each year. (Thackray, 2024)
                      </p>
                      <div className="grid gap-2">
                        <p>Meanwhile, Forres has a number of community gardens</p>
                        <ul className="list-disc pl-6">
                          <li>Forres in Bloom</li>
                          <li>Forres Friends of Woods and Fields</li>
                          <li>Transition Town Forres</li>
                          <li>Forres Community Garden and Allotments</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-5">
                    <div className="grid gap-3">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Field Research
                      </h3>
                      <p>These are all gardening and growing I found in Forres</p>
                    </div>
                    <Image
                      src="/projects/community-gardens/outputs/field-research.png"
                      alt="Field research strip showing gardens and floral displays in Forres"
                      width={1558}
                      height={168}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      unoptimized
                      className="h-auto w-full"
                    />
                    <div className="grid gap-6 md:grid-cols-5 md:gap-5">
                      <p>
                        <strong>Community Gardens</strong>
                        <br />
                        Forres Friends &amp; Transition Town Forres
                      </p>
                      <p>
                        <strong>Grant Park</strong>
                        <br />
                        peacock, ladybird or butterfly-shaped creations
                      </p>
                      <p>
                        <strong>High Street</strong>
                        <br />
                        hanging baskets decorating &amp; flowers beds
                      </p>
                      <p>
                        <strong>Roadside</strong>
                        <br />
                        flowers beds
                      </p>
                      <p>
                        <strong>Residents&apos; Gardens</strong>
                        <br />
                        Magnolia &amp; Apple Trees
                      </p>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Gardening Trends
                    </h3>
                    <p>
                      Through the desktop research, I learnt that gardening has been used as a form of healing and a
                      way to <strong>socialise</strong>, especially after the epidemic, the need for mental health and
                      socialising is stronger, and <strong>more and more people</strong> are into and starting to learn
                      to garden.
                    </p>
                    <ul className="grid gap-6 pt-3">
                      <li className="grid gap-1">
                        <p className="font-black">
                          Gardens functioned as therapeutic landscapes during and after COVID-19
                        </p>
                        <p>
                        Gardens have long been considered as refuges into which we retreat to{" "}
                        <strong>escape various struggles and challenges.</strong> There is positive potential for
                        therapeutic garden landscapes beyond COVID-19. (Marsh et al, 2021)
                        </p>
                      </li>
                      <li className="grid gap-1">
                        <p className="font-black">
                          High levels of knowledge and interest in gardening among young people in the UK
                        </p>
                        <p>
                        As a hobby, gardening is seen positively. <strong>72%</strong> of millennials have already
                        helped with gardening, <strong>79%</strong> have grown a plant and 75% enjoy growing plants.
                        (Evelegh, 2016)
                        </p>
                      </li>
                      <li className="grid gap-1">
                        <p className="font-black">
                          Global trends in the growth of consumer demand for organic food
                        </p>
                        <p>
                        A gradual, yet, extensive growth has been witnessed worldwide in{" "}
                        <strong>demand for organic food</strong> (Sultan et al, 2020) with global sales posited to have
                        crossed USD <strong>90 billion</strong> in the past twenty years. (Willer et al, 2020)
                        </p>
                      </li>
                    </ul>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-stage-2" title="Stage2 Interview with Stakeholder">
                <section
                  className="grid gap-16 bg-white text-[14px] font-normal leading-normal text-black md:text-[16px] xl:text-[18px]"
                  aria-label="Stage 2 interview with stakeholder"
                >
                  <section className="grid gap-8">
                    <Image
                      src="/projects/community-gardens/outputs/forres-friends-introduction.png"
                      alt="Forres Friends of Woods and Fields introduction over a site boundary map"
                      width={1684}
                      height={1214}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      unoptimized
                      className="h-auto w-full"
                    />

                    <p className="max-w-5xl">
                      After contacting Nick, the founder of Forres Friend, by email, I went to Forres Friend on 15 June
                      for a 40-minute interview and participated in a 3-hour gardening session on the same day.
                    </p>

                    <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/participatory-observation.png"
                        alt="Participatory observation collage showing weekly gardening events and open day festival"
                        width={1230}
                        height={692}
                        sizes="(min-width: 1024px) 65vw, 100vw"
                        unoptimized
                        className="h-auto w-full"
                      />
                      <div className="grid gap-5">
                        <p>
                          Every Wednesday and every other Saturday, Forres Friends of Woods and Fields is hosting an
                          event at Sanquhar Woods &amp; Chapleton Fields from 10am to 1pm with founder Nick organising
                          and guiding volunteers in organic gardening.
                        </p>
                        <p>
                          In addition to the weekly gardening events, Forres Friends has organised an Open Day Festival
                          to celebrate a beautiful year and abundance of harvest for two years in a row. Around 250
                          people attended an open day focused on the work of a local environmental charity in 2023.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-5">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Participatory Observation
                    </h3>
                    <Image
                      src="/projects/community-gardens/outputs/participatory-observation-storyboard.png"
                      alt="Participatory observation storyboard mapping time, pains, gains and mood during a gardening session"
                      width={1614}
                      height={1037}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      unoptimized
                      className="h-auto w-full"
                    />
                  </section>

                  <section className="grid gap-5">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Findings
                    </h3>
                    <div className="grid gap-5">
                      <div className="grid gap-2">
                        <p className="font-black">
                          1. People are increasingly disconnected from the land and its environmental challenges.
                        </p>
                        <div className="grid gap-1 border-l-4 border-neutral-300 pl-3 text-neutral-500">
                          <p>&apos;It&apos;s not just saying farmers must do this, it&apos;s also the public.&apos;</p>
                          <p>
                            &apos;She didn&apos;t know that&apos;s where peas came from. They come from a supermarket in a
                            bag that&apos;s frozen.&apos;
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <p className="font-black">2. Organic food is costly, but growers are not fairly rewarded.</p>
                        <div className="border-l-4 border-neutral-300 pl-3 text-neutral-500">
                          <p>
                            &apos;There are organic producers, but they find it difficult because they have to charge a
                            higher price.&apos;
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <p className="font-black">
                          3. Limited publicity and poor location visibility make the organisation difficult for
                          newcomers to discover and access.
                        </p>
                        <div className="border-l-4 border-neutral-300 pl-3 text-neutral-500">
                          <p>&apos;Would like to have more young people join in&apos;</p>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <p className="font-black">
                          4. Volunteers share not only their harvests, but also their lives.
                        </p>
                        <div className="border-l-4 border-neutral-300 pl-3 text-neutral-500">
                          <p>&apos;Try the cheese I brought back from Poland last month.&apos;</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-stage-3" title="Stage3 Participatory Workshop">
                <section
                  className="grid gap-16 bg-white text-[14px] font-normal leading-normal text-black md:text-[16px] xl:text-[18px]"
                  aria-label="Stage 3 participatory workshop"
                >
                  <Image
                    src="/projects/community-gardens/outputs/participatory-workshop-bg.png"
                    alt="Participatory workshop overview with workshop purpose and background photo"
                    width={1684}
                    height={1220}
                    sizes="(min-width: 1440px) 1440px, 100vw"
                    unoptimized
                    className="h-auto w-full"
                  />

                  <section className="grid gap-8">
                    <div className="grid gap-5">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Part 1 - Questionnaire
                      </h3>
                      <p className="max-w-2xl">
                        A questionnaire containing multiple-choice and short-answer questions about their gardening
                        background and basic concepts of organic growing.
                      </p>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/questionnaire.png"
                        alt="Completed workshop questionnaire sheets with participant summary"
                        width={674}
                        height={540}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        unoptimized
                        className="h-auto w-full max-w-[674px]"
                      />

                      <div className="grid gap-14">
                        <section className="grid gap-3">
                          <p className="font-black text-[#C99354]">
                            4 Participants
                            <br />
                            with Over 5 Years of Gardening Experience
                          </p>
                          <div className="grid gap-1">
                            <p>
                              <strong className="text-[#C99354]">Crops Grown:</strong> Vegetables and herbs
                            </p>
                            <p>
                              <strong className="text-[#C99354]">Weekly Gardening Time:</strong> More than 7 hours
                            </p>
                            <p>
                              <strong className="text-[#C99354]">Purpose:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Protect the environment</li>
                              <li>Meet new friends</li>
                              <li>Connect with the land and people</li>
                              <li>Mental health benefits</li>
                            </ol>
                            <p>
                              <strong className="text-[#C99354]">Challenges:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Planning year-round harvests</li>
                              <li>Not having enough time</li>
                              <li>Physical limitations</li>
                              <li>Bad weather</li>
                            </ol>
                            <p>
                              <strong className="text-[#C99354]">Needs:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Access to farmers&apos; markets</li>
                              <li>Engaging young people in gardening</li>
                            </ol>
                            <p>
                              <strong className="text-[#C99354]">Other Information:</strong> Volunteers at more than one
                              farm
                            </p>
                          </div>
                        </section>

                        <section className="grid gap-3">
                          <p className="font-black text-[#86A9B6]">
                            3 Participants
                            <br />
                            with Less Than 3 Years of Gardening Experience
                          </p>
                          <div className="grid gap-1">
                            <p>
                              <strong className="text-[#86A9B6]">Crops Grown:</strong> Vegetables and flowers
                            </p>
                            <p>
                              <strong className="text-[#86A9B6]">Weekly Gardening Time:</strong> 1-3 hours
                            </p>
                            <p>
                              <strong className="text-[#86A9B6]">Purpose:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Personal interest</li>
                              <li>Protect the environment</li>
                              <li>Mental health benefits</li>
                            </ol>
                            <p>
                              <strong className="text-[#86A9B6]">Challenges:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Lack of gardening knowledge</li>
                              <li>Bad weather</li>
                            </ol>
                            <p>
                              <strong className="text-[#86A9B6]">Needs:</strong>
                            </p>
                            <ol className="list-decimal pl-6">
                              <li>Skill training</li>
                              <li>Community garden</li>
                              <li>Workshops to learn gardening knowledge</li>
                            </ol>
                            <p>
                              <strong className="text-[#86A9B6]">Other Information:</strong> Growing food for food banks
                            </p>
                          </div>
                        </section>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-8">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Part 2 - Ideal Garden Design
                    </h3>

                    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/ideal-garden-design.png"
                        alt="Ideal garden design workshop sheets and plant cards"
                        width={766}
                        height={952}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        unoptimized
                        className="h-auto w-full max-w-[766px]"
                      />

                      <div className="grid gap-14">
                        <section className="grid gap-8">
                          <div className="grid gap-2">
                            <p className="font-black text-neutral-500">Food sources</p>
                            <p>
                              Only one participant chose to grow flowers, while the other four tended to grow more
                              vegetables
                            </p>
                          </div>

                          <div className="grid gap-2">
                            <p className="font-black text-neutral-500">Socialising and sharing</p>
                            <p>Grow fruits for people to pick</p>
                          </div>

                          <div className="grid gap-2">
                            <p className="font-black text-neutral-500">Experienced in growing vegetables</p>
                            <p>Zoned gardening</p>
                            <p>Plant carrots and tomatoes in the warm room</p>
                          </div>
                        </section>

                        <section className="grid gap-3">
                          <h3 className="text-[20px] font-black leading-tight text-[#75A723] md:text-[22px] xl:text-[24px]">
                            Insights from Part 1&amp;2
                          </h3>
                          <ol className="list-decimal pl-6">
                            <li>Older people don&apos;t have enough energy for planting.</li>
                            <li>
                              There are too few learning opportunities for young people interested in gardening.
                            </li>
                            <li>People value the social aspect of gardening.</li>
                            <li>People are more willing to grow vegetables than flowers.</li>
                          </ol>
                        </section>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-8">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Part 3 - Challenges of Forres Friends Discussion
                    </h3>

                    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/challenges-discussion.png"
                        alt="Challenges discussion workshop map with challenge categories"
                        width={928}
                        height={664}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        unoptimized
                        className="h-auto w-full max-w-[928px]"
                      />

                      <section className="grid gap-8">
                        <h3 className="text-[20px] font-black uppercase leading-tight text-black md:text-[22px] xl:text-[24px]">
                          Insights
                        </h3>

                        <p>
                          For participants in the Community Gardens, &quot;organic&quot; is not a certificate from a
                          certification body, but a reciprocal relationship between consumers and farmers{" "}
                          <strong className="text-[#75A723]">
                            based on the values of knowledge, trust, support and sharing.
                          </strong>
                        </p>

                        <div className="grid gap-8">
                          <div className="grid gap-3 md:grid-cols-[44px_1fr]">
                            <div className="flex h-10 w-10 items-center justify-center text-[#75A723]" aria-hidden="true">
                              <span className="h-6 w-2 rounded-full bg-current" />
                              <span className="mx-1 h-8 w-2 rounded-full bg-current" />
                              <span className="h-6 w-2 rounded-full bg-current" />
                            </div>
                            <p>
                              The public has little knowledge of organic growing, and there is a lack of avenues for
                              gardening learning, and it is{" "}
                              <strong className="text-[#75A723]">
                                difficult to start a gardening hobby
                              </strong>{" "}
                              without having friends around who are gardening experts.
                            </p>
                          </div>

                          <div className="grid gap-3 md:grid-cols-[44px_1fr]">
                            <div className="flex h-10 w-10 items-center justify-center gap-1 text-[#75A723]" aria-hidden="true">
                              <span className="h-7 w-2 rounded-b-full bg-current" />
                              <span className="h-5 w-3 rounded-t-full bg-current" />
                              <span className="h-7 w-2 rounded-b-full bg-current" />
                            </div>
                            <p>
                              Sharing among the volunteers is not only about the process and results of their labour,
                              but also about many other things in their lives. For example, how their children and pets
                              are doing, what&apos;s new in the community, how to cook delicious food, etc.{" "}
                              <strong className="text-[#75A723]">
                                The members have a strong bond with each other and the group is stable.
                              </strong>
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Opportunity From Participatory Workshop
                    </h3>
                    <p className="max-w-6xl">
                      By increasing publicity channels, we can make more people, especially young people, aware of
                      community gardens like Forres Friends. This will encourage them to participate in gardening,
                      assist the elderly, and learn gardening skills, thereby practicing sustainable gardening in their
                      daily lives.
                    </p>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-stage-4" title="Stage4 Target Users">
                <section
                  aria-label="Stage 4 target users"
                  className="grid gap-16 bg-white text-[14px] font-normal leading-relaxed text-black md:text-[16px] xl:text-[18px]"
                >
                  <section className="grid gap-8">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Interview
                    </h3>
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_0.85fr] lg:items-start">
                      <div className="grid gap-5">
                        <div>
                          <p className="font-black">Mackenzie &amp; Cruickshank</p>
                          <p>Garden centre, 1 West Rd, Forres IV36 2GU</p>
                        </div>
                        <Image
                          src="/projects/community-gardens/outputs/target-users-interview.png"
                          alt="Interview field photos at Mackenzie and Cruickshank garden centre."
                          width={758}
                          height={641}
                          className="h-auto w-full"
                          unoptimized
                        />
                        <div className="grid gap-4">
                          <p>I interviewed 11 people and these are their age &amp; gender</p>
                          <div className="grid gap-4 text-[13px] md:grid-cols-3 md:text-[15px] xl:text-[16px]">
                            <div className="grid gap-2">
                              <p>&gt;20 years</p>
                              <div aria-label="One female participant" className="flex gap-1 text-[24px] leading-none text-[#ff74a8]">
                                <span>♀</span>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <p>20-30 years</p>
                              <div aria-label="Four participants" className="flex gap-1 text-[24px] leading-none">
                                <span className="text-[#5ecbe7]">♂</span>
                                <span className="text-[#5ecbe7]">♂</span>
                                <span className="text-[#ff74a8]">♀</span>
                                <span className="text-[#ff74a8]">♀</span>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <p>30-40 years</p>
                              <div aria-label="Six participants" className="flex gap-1 text-[24px] leading-none">
                                <span className="text-[#5ecbe7]">♂</span>
                                <span className="text-[#5ecbe7]">♂</span>
                                <span className="text-[#ff74a8]">♀</span>
                                <span className="text-[#ff74a8]">♀</span>
                                <span className="text-[#ff74a8]">♀</span>
                                <span className="text-[#ff74a8]">♀</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-6 lg:pt-10">
                        <p className="max-w-xl font-black">
                          To find out the extent of young people&apos;s awareness and interest in gardening
                        </p>
                        <div className="grid gap-4">
                          <h4 className="text-[20px] font-black text-[#75A723] md:text-[24px] xl:text-[26px]">
                            Findings
                          </h4>
                          <div className="grid gap-5">
                            <div>
                              <p>ways to learn gardening</p>
                              <ul className="list-disc pl-6">
                                <li>family members</li>
                                <li>community activities</li>
                                <li>neighbors and friends</li>
                                <li>self-learning through practice</li>
                              </ul>
                            </div>
                            <div>
                              <p>purposes of gardening</p>
                              <ul className="list-disc pl-6">
                                <li>helping elderly family members</li>
                                <li>obtaining healthy food</li>
                                <li>keeping my garden tidy</li>
                                <li>interest and hobby</li>
                                <li>stress relief</li>
                                <li>environmental protection</li>
                                <li>socializing and making friends</li>
                              </ul>
                            </div>
                            <div>
                              <p>difficulties encountered in gardening</p>
                              <ul className="list-disc pl-6">
                                <li>don&apos;t have time</li>
                                <li>don&apos;t have chance to learn</li>
                                <li>don&apos;t have garden now</li>
                              </ul>
                            </div>
                            <div>
                              <p>interest in community gardens</p>
                              <ul className="list-disc pl-6">
                                <li>aware, but not participated</li>
                                <li>
                                  unaware, <span className="text-[#75A723]">not very interested</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-8">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Persona
                    </h3>
                    <Image
                      src="/projects/community-gardens/outputs/target-users-persona.png"
                      alt="Persona sketch for Kate, a 26 year old support worker living in Forres."
                      width={2884}
                      height={1400}
                      className="h-auto w-full"
                      unoptimized
                    />
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <h4 className="font-black text-[#75A723]">Pain Points</h4>
                        <ul className="list-disc pl-6">
                          <li>Busy with work, limited time</li>
                          <li>Lack of professional gardening knowledge</li>
                          <li>No personal garden</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-black text-[#75A723]">Needs</h4>
                        <ul className="list-disc pl-6">
                          <li>Seeds and tools</li>
                          <li>Professional guidance</li>
                          <li>Meeting new friends</li>
                          <li>Large plot of land for growing various crops</li>
                        </ul>
                      </div>
                    </div>
                    <p className="bg-[#dce6cf] px-6 py-5 text-center font-black">
                      Have a little interest and understanding of gardening and would like someone to guide and learn from each other
                    </p>
                  </section>

                  <section className="grid gap-8">
                    <div className="grid gap-3">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Case Study
                      </h3>
                      <p className="max-w-6xl">
                        I went to Mackenzie &amp; Cruickshank, Tesco and the hardware shop on the high street to research
                        the home gardening products that can be bought in Forres. At the end of July I went to Edinburgh
                        and went to two of the largest farmers markets to do field research.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[980px] border-collapse text-left align-top">
                        <thead>
                          <tr className="border-b border-dashed border-neutral-300">
                            <th className="w-[56px] p-4" />
                            <th className="w-1/4 p-4 font-black">Gardening Toolkits For Kids</th>
                            <th className="w-1/4 p-4 font-black">Seeds</th>
                            <th className="w-1/4 p-4 font-black">Grant Park Street Sign</th>
                            <th className="w-1/4 p-4 font-black">
                              Edinburgh farmers&apos; market &amp; Edinburgh Grassmarket
                            </th>
                          </tr>
                          <tr className="border-b border-dashed border-neutral-300">
                            <th className="p-4" />
                            <td className="p-4">
                              <Image
                                src="/projects/community-gardens/outputs/target-users-case-study-1.png"
                                alt="Gardening toolkit for kids with pot, instruction sheet and shop display"
                                width={368}
                                height={192}
                                className="h-auto w-full"
                                unoptimized
                              />
                            </td>
                            <td className="p-4">
                              <Image
                                src="/projects/community-gardens/outputs/target-users-case-study-2.png"
                                alt="Seed packets and vegetable calendar research photos"
                                width={368}
                                height={192}
                                className="h-auto w-full"
                                unoptimized
                              />
                            </td>
                            <td className="p-4">
                              <Image
                                src="/projects/community-gardens/outputs/target-users-case-study-3.png"
                                alt="Grant Park street sign and flower planter photos"
                                width={368}
                                height={192}
                                className="h-auto w-full"
                                unoptimized
                              />
                            </td>
                            <td className="p-4">
                              <Image
                                src="/projects/community-gardens/outputs/target-users-case-study-4.png"
                                alt="Edinburgh farmers market and Grassmarket field research photos"
                                width={368}
                                height={192}
                                className="h-auto w-full"
                                unoptimized
                              />
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-dashed border-neutral-300">
                            <th className="bg-[#dce6cf] p-4 align-top font-normal">pros</th>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>
                                  Fully equipped with tools, including seeds, flower trays, fertiliser, stickers and
                                  guidance notes, so children can follow the instructions for planting
                                </li>
                                <li>Provides stickers and quizzes to make it interesting</li>
                              </ul>
                            </td>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>easy to buy</li>
                                <li>including instructions</li>
                              </ul>
                            </td>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>Waterproof, sturdy and eye-catching</li>
                              </ul>
                            </td>
                            <td className="p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>Support for local farmers</li>
                                <li>
                                  Fresh food, ingredients and handicrafts are available for purchase, with a wide range
                                  of products.
                                </li>
                                <li>Lots of publicity and access to all major social media outlets</li>
                                <li>Good location, easy to find, high foot traffic</li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th className="bg-[#f1d9c9] p-4 align-top font-normal">cons</th>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>Variety limited</li>
                                <li>Vases are disposable, poor quality and not environmentally friendly</li>
                                <li>
                                  Instruction is too simple, only for one type of plant, difficult to cultivate long
                                  term interest.
                                </li>
                                <li>A bit childish for adults, weak learning</li>
                              </ul>
                            </td>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>Unattractive</li>
                                <li>Purely functional</li>
                              </ul>
                            </td>
                            <td className="border-r border-dashed border-neutral-300 p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>No contact details</li>
                                <li>Little information</li>
                              </ul>
                            </td>
                            <td className="p-4 align-top">
                              <ul className="list-disc pl-6">
                                <li>Same as other markets, no special highlights</li>
                                <li>Not much interaction, just browsing and shopping</li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="bg-[#dce6cf] px-8 py-6 font-normal">
                      There are actually <strong>many ways</strong> that people can learn about gardening and community
                      gardens, but the existing <strong>beginner gardening products/services</strong> are too weakly
                      appealing and the touchpoints are <strong>not connected to each other</strong>
                    </p>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-stage-5" title="Stage5 Ideation">
                <section
                  aria-label="Stage 5 ideation"
                  className="grid gap-16 bg-white text-[14px] font-normal leading-relaxed text-black md:text-[16px] xl:text-[18px]"
                >
                  <section className="grid gap-8">
                    <Image
                      src="/projects/community-gardens/outputs/affinity-mapping.png"
                      alt="Affinity mapping wall with clustered sticky notes for touch points, ways of learning, publicity and pain points."
                      width={1684}
                      height={658}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      className="h-auto w-full"
                      unoptimized
                    />

                    <section className="grid gap-5">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Affinity Mapping
                      </h3>
                      <p className="max-w-6xl">
                        I used affinity mapping to list all the insights from stakeholder interviews, engagement
                        workshops, and interviews with young people to come up with the design opportunity.
                      </p>
                    </section>

                    <section className="grid gap-5">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        How Might We
                      </h3>
                      <p className="max-w-6xl">
                        Design a <strong className="text-[#75A723]">home gardening experience</strong> for{" "}
                        <strong className="text-[#75A723]">beginners</strong> connected to the Forres Community Garden,
                        helping them learn gardening independently or through guided volunteering, while supporting the
                        garden&apos;s outreach and recruitment goals.
                      </p>
                    </section>

                    <section className="grid gap-8">
                      <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                        Ideation
                      </h3>

                      <div className="grid gap-8">
                        <div className="grid items-start gap-5 lg:grid-cols-[1fr_auto_1fr]">
                          <div className="grid gap-5">
                            <p className="bg-[#75A723] px-5 py-3 text-center font-black text-white">
                              Home Gardening Experience
                            </p>
                            <div className="grid gap-3">
                              <p className="font-black">For gardening enthusiasts</p>
                              <ul className="list-disc pl-6">
                                <li>learning professional gardening knowledge</li>
                                <li>socialising, meeting new friends</li>
                                <li>easy to get</li>
                                <li>Integration into life without taking up extra time</li>
                              </ul>
                            </div>
                          </div>

                          <p className="self-start text-center text-[34px] font-black leading-none text-[#75A723] md:text-[42px]">
                            +
                          </p>

                          <div className="grid gap-5">
                            <p className="bg-[#75A723] px-5 py-3 text-center font-black text-white">
                              Connecting Touchpoints Together
                            </p>
                            <div className="grid gap-3">
                              <p className="font-black">For community garden organisations</p>
                              <ul className="list-disc pl-6">
                                <li>Increased public understanding of organic growing</li>
                                <li>more volunteers and labour</li>
                                <li>socialising, sharing food, help and love</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mx-auto h-16 w-14 bg-[#75A723] [clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0_70%)]" />

                        <div className="grid gap-6 lg:grid-cols-2">
                          <article className="relative grid gap-6 border-4 border-dashed border-neutral-400 p-6">
                            <div className="grid gap-5 sm:grid-cols-[64px_1fr]">
                              <Image
                                src="/projects/community-gardens/outputs/concept-1-icon.png"
                                alt="Phone icon for app concept"
                                width={104}
                                height={126}
                                className="h-auto w-12"
                                unoptimized
                              />
                              <div className="grid gap-2">
                                <p className="font-black">Concept 1</p>
                                <p>An App includes gardening guidance and connected with community garden websites</p>
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-[72px_1fr]">
                              <p>Pros</p>
                              <p>easy to use for young people</p>
                              <p>Cons</p>
                              <ul className="border-t border-dashed border-neutral-300 pt-3">
                                <li>Difficult to promote</li>
                                <li>Difficult to engage</li>
                                <li>There are more authoritative competitors</li>
                                <li>No one can build and maintain an app over time</li>
                              </ul>
                            </div>

                            <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-400 text-[28px] leading-none text-neutral-400">
                              ×
                            </span>
                          </article>

                          <article className="relative grid gap-6 border-4 border-dashed border-[#75A723] p-6">
                            <div className="grid gap-5 sm:grid-cols-[64px_1fr]">
                              <Image
                                src="/projects/community-gardens/outputs/concept-2-icon.png"
                                alt="Toolkit icon for physical toolkit concept"
                                width={124}
                                height={124}
                                className="h-auto w-12"
                                unoptimized
                              />
                              <div className="grid gap-2">
                                <p className="font-black">Concept 2</p>
                                <p>
                                  A toolkit includes gardening map, calendar, seeds, gardening guidance and connected
                                  with community garden websites
                                </p>
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-[72px_1fr]">
                              <p>Pros</p>
                              <p>
                                Easier for people to actually start gardening
                                <br />
                                Organisations have volunteers who are good at drawing who can design
                              </p>
                              <p>Cons</p>
                              <ul className="border-t border-dashed border-neutral-300 pt-3">
                                <li>Paper is easy to mass produce</li>
                                <li>can be bought and promote more easily</li>
                                <li>Low price</li>
                              </ul>
                            </div>

                            <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#75A723] text-[28px] leading-none text-[#75A723]">
                              ✓
                            </span>
                          </article>
                        </div>
                      </div>
                    </section>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-stage-6" title="Stage6 Delivery" defaultOpen>
                <section
                  aria-label="Stage 6 delivery"
                  className="grid gap-16 bg-white text-[14px] font-normal leading-relaxed text-black md:text-[16px] xl:text-[18px]"
                >
                  <section className="grid gap-5">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Overview
                    </h3>
                    <div className="grid gap-1">
                      <p className="text-[18px] font-black leading-tight md:text-[22px] xl:text-[26px]">
                        Home gardening toolkits and community garden service for young people (13-29 years old)
                      </p>
                      <p className="italic">
                        *according to the definitions given by Office for National Statistics, UK government
                      </p>
                    </div>
                  </section>

                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Workflow
                    </h3>
                    <div className="grid gap-5 lg:grid-cols-3">
                      {[
                        "Interested in gardening",
                        "Shop for gardening toolkits",
                        "Follow toolkits guide home gardening",
                        "Follow the map to get basic information about community garden.",
                        "Follow the calendar to learn about community garden's special events.",
                        "Street signs on flower beds to increase the publicity of community gardens.",
                        "Participate in community garden's special events.",
                        "Become a volunteer after learning about community garden",
                        "becoming more experienced in gardening",
                      ].map((step, index) => (
                        <div
                          key={step}
                          className="relative min-h-[112px] border-2 border-dashed border-[#75A723] p-5 pr-12 text-[18px] leading-tight md:text-[22px] xl:text-[26px]"
                        >
                          <p>{step}</p>
                          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#75A723] text-[16px] font-black leading-none text-white">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Service Blueprint
                    </h3>
                    <Image
                      src="/projects/community-gardens/outputs/service-blueprint.png"
                      alt="Service blueprint showing phases, evidence, customer actions, interactions and support process for the community garden toolkit service."
                      width={1684}
                      height={966}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      className="h-auto w-full"
                      unoptimized
                    />
                  </section>

                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      Touchpoints
                    </h3>
                    <div className="grid gap-6 lg:grid-cols-3">
                      <section className="grid grid-rows-[auto_1fr] gap-6">
                        <h4 className="flex min-h-9 items-center justify-center bg-[#dce6cf] px-4 py-2 text-center font-black uppercase">
                          Physical
                        </h4>
                        <div className="grid gap-8 sm:grid-cols-[120px_1fr] sm:items-start">
                          <div className="grid justify-items-center gap-10">
                            <div className="grid justify-items-center gap-3 text-center">
                              <Image
                                src="/projects/community-gardens/outputs/touchpoint-toolkits.png"
                                alt="Toolkits touchpoint icon"
                                width={64}
                                height={64}
                                className="h-16 w-16 object-contain"
                                unoptimized
                              />
                              <p>Toolkits</p>
                            </div>
                            <div className="grid justify-items-center gap-3 text-center">
                              <Image
                                src="/projects/community-gardens/outputs/touchpoint-street-sign.png"
                                alt="Street Sign touchpoint icon"
                                width={64}
                                height={64}
                                className="h-16 w-16 object-contain"
                                unoptimized
                              />
                              <p>Street Sign</p>
                            </div>
                          </div>

                          <div className="relative grid gap-4 pl-0 sm:pl-12">
                            <span
                              aria-hidden="true"
                              className="absolute left-4 top-8 hidden h-[132px] border-l-2 border-dashed border-[#75A723] sm:block"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute left-[-72px] top-8 hidden w-[88px] border-t-2 border-dashed border-[#75A723] sm:block"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute left-4 top-[92px] hidden w-8 border-t-2 border-dashed border-[#75A723] sm:block"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute left-4 top-[160px] hidden w-8 border-t-2 border-dashed border-[#75A723] sm:block"
                            />
                            {[
                              {
                                label: "Map",
                                src: "/projects/community-gardens/outputs/touchpoint-map.png",
                              },
                              {
                                label: "Calendar",
                                src: "/projects/community-gardens/outputs/touchpoint-calendar.png",
                              },
                              {
                                label: "Seeds",
                                src: "/projects/community-gardens/outputs/touchpoint-seeds.png",
                              },
                            ].map((touchpoint) => (
                              <div key={touchpoint.label} className="grid grid-cols-[64px_1fr] items-center gap-4">
                                <Image
                                  src={touchpoint.src}
                                  alt={`${touchpoint.label} touchpoint icon`}
                                  width={64}
                                  height={64}
                                  className="h-16 w-16 object-contain"
                                  unoptimized
                                />
                                <p>{touchpoint.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>

                      <section className="grid grid-rows-[auto_1fr] gap-6">
                        <h4 className="flex min-h-9 items-center justify-center bg-[#dce6cf] px-4 py-2 text-center font-black uppercase">
                          Digital
                        </h4>
                        <div className="grid content-start gap-6">
                          <div className="grid grid-cols-[72px_1fr] items-center gap-4">
                            <Image
                              src="/projects/community-gardens/outputs/touchpoint-ar-games.png"
                              alt="AR games in special event touchpoint icon"
                              width={64}
                              height={64}
                              className="h-16 w-16 object-contain"
                              unoptimized
                            />
                            <p>
                              AR games in
                              <br />
                              special event
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="grid grid-rows-[auto_1fr] gap-6">
                        <h4 className="flex min-h-9 items-center justify-center bg-[#dce6cf] px-4 py-2 text-center font-black uppercase">
                          People
                        </h4>
                        <div className="grid content-start gap-6">
                          {[
                            {
                              label: "Community Garden Organizations",
                              src: "/projects/community-gardens/outputs/touchpoint-community-garden-organizations.png",
                            },
                            {
                              label: "Volunteers",
                              src: "/projects/community-gardens/outputs/touchpoint-volunteers.png",
                            },
                            {
                              label: "Shop Assistant",
                              src: "/projects/community-gardens/outputs/touchpoint-shop-assistant.png",
                            },
                          ].map((touchpoint) => (
                            <div key={touchpoint.label} className="grid grid-cols-[72px_1fr] items-center gap-4">
                              <Image
                                src={touchpoint.src}
                                alt={`${touchpoint.label} touchpoint icon`}
                                width={64}
                                height={64}
                                className="h-16 w-16 object-contain"
                                unoptimized
                              />
                              <p>{touchpoint.label}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </section>

                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight text-[#75A723] md:text-[28px] xl:text-[30px]">
                      User Testing And Iteration
                    </h3>
                    <div className="grid gap-8 lg:grid-cols-[0.56fr_0.44fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/user-testing-gardening-toolkits.png"
                        alt="Participants testing the gardening calendar, map and seed bag toolkit."
                        width={908}
                        height={934}
                        sizes="(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 100vw"
                        className="h-auto w-full"
                        unoptimized
                      />

                      <div className="grid gap-6">
                        <h4 className="font-black">1. Gardening Toolkits</h4>

                        <div className="grid gap-4 text-[14px] leading-snug md:text-[16px] xl:text-[18px]">
                          <p className="w-fit rounded-full border-2 border-dashed border-[#75A723] px-4 py-2">
                            I like the drawings and I would buy this map
                          </p>
                          <p className="ml-auto w-fit max-w-[90%] rounded-full border-2 border-dashed border-[#75A723] px-4 py-2">
                            I wish the calendars had more guidance, like instructions or something
                          </p>
                          <p className="w-fit rounded-full border-2 border-dashed border-[#f2a54a] px-4 py-2">
                            The paper quality of these calendars is comfortable to touch
                          </p>
                          <p className="ml-auto w-fit max-w-[90%] rounded-full border-2 border-dashed border-[#e6696b] px-4 py-2">
                            The QR code tutorial for the seed packet was detailed and the packaging appealed to me
                          </p>
                        </div>

                        <p>
                          I invited three GSA students and two young passers-by at Forres Station to participate in the test individually.
                        </p>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <p className="font-black text-[#777777]">A</p>
                            <p>
                              male
                              <br />
                              25 year old
                              <br />
                              Spanish
                              <br />
                              Frontend engineer
                            </p>
                          </div>
                          <div>
                            <p className="font-black text-[#777777]">N</p>
                            <p>
                              male
                              <br />
                              24 years old
                              <br />
                              Nigerian
                              <br />
                              working staff in Tesco
                            </p>
                          </div>
                        </div>

                        <p>
                          All five of them commented that they liked the style of the toolkits, and one of them wanted the toolkit to be more instructive, so I added soil, sunlight, and irrigation suggestions specific to the month on the back of the calendar. A sheet of instructions was included explaining the connections between the map, the calendar, the seed packets, and how this toolkit relates to the Forres community garden.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.56fr_0.44fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/user-testing-street-sign.png"
                        alt="Street sign material iteration from acrylic to wood with waterproof coating, tested beside a rose bed."
                        width={904}
                        height={482}
                        sizes="(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 100vw"
                        className="h-auto w-full"
                        unoptimized
                      />

                      <div className="grid gap-5">
                        <div>
                          <h4 className="font-black">2. Street Sign</h4>
                          <p className="mt-3 text-[#777777]">
                            Classmate C
                            <br />
                            Interaction Design
                          </p>
                        </div>

                        <p>
                          Since workshop could not do metalwork, I chose acrylic first for waterproofness, but after testing with my classmate C, the QR code was laser engraved on the acrylic board with a blurred pattern, and with the material itself being highly reflective, the user needed to look for an angle in order to scan it out.
                        </p>

                        <p className="font-black">
                          So, I changed the street sign to wood and brushed two layers of waterproof coating as an iteration.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.56fr_0.44fr] lg:items-start">
                      <Image
                        src="/projects/community-gardens/outputs/user-testing-ar-game.png"
                        alt="AR gardening game user testing with an iPad and Reality Composer scene."
                        width={908}
                        height={516}
                        sizes="(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 100vw"
                        className="h-auto w-full"
                        unoptimized
                      />

                      <div className="grid gap-5">
                        <div>
                          <h4 className="font-black">3. AR Game</h4>
                          <div className="mt-3 grid gap-4 text-[#777777] sm:grid-cols-2">
                            <p>
                              Classmate C
                              <br />
                              Interaction Design
                            </p>
                            <p>
                              Classmate K
                              <br />
                              Environment Design
                            </p>
                          </div>
                        </div>

                        <p>
                          The two students commented that the AR effect added a lot of fun to Forres street, and said they were looking forward to seeing more models, encouraging me to explore more possibilities and themes.
                        </p>

                        <p>
                          During our user testing, a passing teenager saw our iPad screen and took the initiative to ask us what we were doing, expressing interest and like for this AR effect and thinking it was awesome and cool.
                        </p>
                      </div>
                    </div>
                  </section>
                </section>
              </CaseStudySubAccordion>

              <CaseStudySubAccordion id="research-reference" title="REFERENCE">
                <section
                  aria-label="References and appendix"
                  className="grid gap-16 bg-white text-[14px] font-normal leading-relaxed text-black md:text-[16px] xl:text-[18px]"
                >
                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight md:text-[28px] xl:text-[30px]">
                      References
                    </h3>
                    <div className="grid gap-4">
                      <p>
                        Blanco, H. and Lal, R., 2023. Restoration and Management of Degraded Soils. In: *Soil Conservation and Management*. Springer, Cham. Available at: https://doi.org/10.1007/978-3-031-30341-8_14.
                      </p>
                      <p>
                        Evelegh, R., 2016. Big up Monty D: what young people think about gardening. *The Guardian*, [online] 22 September. Available at: https://www.theguardian.com/lifeandstyle/gardening-blog/2016/sep/22/big-up-monty-d-what-young-people-think-about-gardening.
                      </p>
                      <p>
                        Kinema, 2024. Six Inches of Soil Event. [online] Available at: https://kinema.com/events/six-inches-of-soil-iyaqcj/tickets.
                      </p>
                      <p>
                        Marsh, P., Diekmann, L.O., Egerer, M., Lin, B., Ossola, A. and Kingsley, J., 2021. Where birds felt louder: The garden as a refuge during COVID-19. *Wellbeing, Space and Society*, 2, p.100055. https://doi.org/10.1016/j.wss.2021.100055.
                      </p>
                      <p>
                        Paz-Ferreiro, J., Gascó, G., Méndez, A. and Reichman, S.M., 2018. Soil Pollution and Remediation. *International Journal of Environmental Research and Public Health*, 15(8), p.1657. Available at: https://doi.org/10.3390/ijerph15081657.
                      </p>
                      <p>
                        Produce Green Foundation, 2024. Community Supported Agriculture (CSA). [online] Available at: https://pcd.org.hk/csa/gb/csa01.html.
                      </p>
                      <p>
                        Saggau, P., Busche, F., Brunotte, J., Duttmann, R. and Kuhwald, M., 2024. Soil loss due to crop harvesting in highly mechanized agriculture: A case study of sugar beet harvest in northern Germany. *Soil and Tillage Research*, 242, 106144. https://doi.org/10.1016/j.still.2024.106144.
                      </p>
                      <p>
                        Scotland&apos;s Environment Web, 2024. Risk Maps. [online] Available at: https://soils.environment.gov.scot/maps/risk-maps/.
                      </p>
                      <p>
                        Sultan, P., Tarafder, T., Pearson, D. and Henryks, J., 2020. Intention-behaviour gap and perceived behavioural control-behaviour gap in theory of planned behaviour: Moderating roles of communication, satisfaction and trust in organic food consumption. *Food Quality and Preference*, 81, 103838. https://doi.org/10.1016/j.foodqual.2019.103838.
                      </p>
                      <p>
                        Tandon, A., Dhir, A., Kaur, P., Kushwah, S. and Salo, J., 2020. Why do people buy organic food? The moderating role of environmental concerns and trust. *Journal of Retailing and Consumer Services*, 57, 102247. https://doi.org/10.1016/j.jretconser.2020.102247.
                      </p>
                      <p>
                        Willer, H., Trávníček, J. and Schlatter, S., 2024. *The World of Organic Agriculture. Statistics and Emerging Trends 2024*.
                      </p>
                    </div>
                  </section>

                  <section className="grid gap-6">
                    <h3 className="text-[24px] font-black leading-tight md:text-[28px] xl:text-[30px]">
                      Appendix
                    </h3>
                    <Image
                      src="/projects/community-gardens/outputs/appendix.png"
                      alt="Appendix documents including consent forms and participant information sheets."
                      width={1630}
                      height={573}
                      sizes="(min-width: 1440px) 1440px, 100vw"
                      className="h-auto w-full"
                      unoptimized
                    />
                  </section>
                </section>
              </CaseStudySubAccordion>

              <section className="flex justify-center pt-4">
                <Image
                  src="/projects/community-gardens/outputs/graduation-display.png"
                  alt="Huilin Shen presenting the Community Gardens Forres graduation display."
                  width={424}
                  height={394}
                  sizes="(min-width: 768px) 360px, 68vw"
                  className="h-auto w-[68vw] max-w-[360px]"
                  unoptimized
                />
              </section>
            </div>
          </ResearchProcessAccordion>
        ) : (
          <section className="grid gap-5">
            {project.sections.map((section, index) => (
              <section
                id={`section-${index}`}
                key={section.title}
                className="grid gap-4 rounded-lg border border-[#e3d6b5] bg-white p-5 shadow-[0_4px_0_#eadfca] md:grid-cols-[0.34fr_1fr] md:p-7"
              >
                <h2 className="text-2xl font-medium">{section.title}</h2>
                <p className="leading-8 text-[#5c5749]">
                  {section.body}
                </p>
              </section>
            ))}
          </section>
        )}

        <footer className={isCommunityGardens ? "pb-12 pt-24 md:pb-16 md:pt-28" : "pb-12 pt-[168px] md:pb-16 md:pt-[200px] lg:pt-52"}>
          <ProjectFooterNavigation current="community-gardens" />
        </footer>
      </article>
    </main>
  );
}

