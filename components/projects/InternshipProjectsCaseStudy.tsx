"use client";

import Image from "next/image";
import { ProjectChapterNavigation } from "./ProjectChapterNavigation";
import { ExternalLink } from "lucide-react";

const internshipCopy = {
  hero: {
    label: "Internship Projects",
    title: "Consumer innovation and industrial design",
    summary:
      "Two early-career projects where I worked across user research, product thinking, visual design, industrial design and interface design.",
    metadata: [
      ["Role", "Design Internships"],
      ["Timeline", "2020–2023"],
      ["Impact", ""],
    ],
  },
  projects: [
    {
      id: "illuminera-suntory",
      index: "02",
      discipline: "Consumer Innovation",
      studio: "Illuminera × Suntory × TMIC",
      title: "Suntory Qingxiang Oolong Tea",
      introduction:
        "Suntory wanted to identify a new product opportunity in China’s increasingly competitive ready-to-drink tea market.",
      details: [
        ["Role", "Design Intern, Consumer & Big Health (CBH)"],
        ["Company", "Illuminera"],
        ["Client", "Suntory × TMIC"],
        ["Location", "Shanghai"],
      ],
      outcome: "Within six months of launch, Qingxiang Oolong Tea became Suntory’s No.1 new product by GMV.",
      roleNote: "Brand Research · User Research · Packaging Design",
      navMetadata: "Brand Research · User Research · Packaging Design",
      futureSections: ["Project Brief", "The Challenge", "Target Audience", "My Contribution", "Impact"],
    },
    {
      id: "fotile-range-hood",
      index: "01",
      discipline: "Industrial Design",
      studio: "GoodMatter × FOTILE",
      title: "FOTILE Refrigerated Range Hood",
      introduction:
        "At GoodMatter Design Studio, I supported the development of FOTILE’s Refrigerated Range Hood across user research, industrial design and interface design. The work moved from in-home contextual research and kitchen pain-point synthesis to product concepts, 3D form studies and the cooker’s touchscreen interface.",
      details: [
        ["Role", "UI Designer Intern"],
        ["Company", "GoodMatter Design Studio"],
        ["Client", "FOTILE Refrigerated Range Hood"],
        ["Timeline", "Jan 2020 – Sep 2020"],
        ["Location", "Shanghai"],
      ],
      outcome: "User research · Industrial design · Interface design",
      roleNote: null,
      navMetadata: "Industrial Design · Product Development",
      futureSections: ["Context", "Challenge", "My Contribution", "Insight", "Form Exploration", "3D Development", "Outcome", "Reflection"],
    },
  ],
} as const;

const chapters = [
  ["Hero", "hero"],
  ["01 · FOTILE", "fotile-range-hood"],
  ["02 · Suntory", "illuminera-suntory"],
] as const;

const sectionLabelClass =
  "font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-black/30 md:text-[12px]";
const sectionTitleClass =
  "text-[42px] font-normal leading-[0.98] tracking-[-0.055em] text-[#0a0a0a] md:text-[62px] lg:text-[72px]";
const bodyClass = "text-[17px] leading-relaxed text-black/52 md:text-[19px]";

function ProjectHeading({
  number,
  discipline,
  studio,
  color,
}: {
  number: string;
  discipline: string;
  studio: string;
  color: string;
}) {
  return (
    <div className="grid gap-2 py-2" style={{ color }}>
      <h2 className="text-[24px] font-bold leading-[1.08] tracking-[-0.025em] md:text-[28px] lg:text-[32px]">
        {number} / {discipline}
      </h2>
      <p className="text-[17px] font-bold leading-[1.2] tracking-[-0.015em] md:text-[19px] lg:text-[21px]">
        {studio}
      </p>
    </div>
  );
}

function SuntoryProjectChapter() {
  return (
    <section
      id="illuminera-suntory"
      className="mt-48 scroll-mt-24 overflow-hidden bg-white px-5 py-24 md:px-10 lg:mt-64 lg:py-32"
      data-future-sections="Project Brief,The Challenge,Target Audience,My Contribution,Impact"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-20 lg:gap-24">
        <header className="grid gap-12 border-t border-black/[0.08] pt-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] lg:items-start lg:gap-14">
          <div className="grid content-start gap-7 lg:py-4">
            <ProjectHeading
              number="02"
              discipline="Consumer Innovation"
              studio="Illuminera × Suntory × TMIC"
              color="#52C4DE"
            />

            <div className="grid gap-5">
              <h2 className="max-w-[720px] text-[42px] font-normal leading-[0.98] tracking-[-0.055em] text-[#0a0a0a] md:text-[58px] lg:text-[64px]">
                Suntory Qingxiang Oolong Tea
              </h2>
              <p className="max-w-[680px] text-[23px] font-medium leading-tight tracking-[-0.035em] text-black/76 md:text-[30px]">
                From consumer insight to a launched new tea product
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 border-y border-black/[0.08] py-7 sm:grid-cols-2">
              {[
                ["Role", "UI/UX Design Intern"],
                ["Timeline", "Jan 2023 — Jun 2023"],
                ["Location", "Shanghai"],
                [
                  "Scope",
                  "Brand Research · User Research · Packaging Design",
                ],
              ].map(([label, value]) => (
                <div key={label} className="grid content-start gap-2">
                  <dt className={sectionLabelClass}>{label}</dt>
                  <dd className="text-[16px] leading-relaxed text-black/58 md:text-[17px]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid max-w-[640px] gap-5">
              <p className={sectionLabelClass}>Project Brief</p>
              <div className={`grid gap-4 ${bodyClass}`}>
                <p>Suntory, a Japanese beverage company, wanted to find new growth in China&apos;s increasingly competitive ready-to-drink tea market.</p>
                <p>As a Design Intern in Illuminera&apos;s Consumer &amp; Big Health (CBH) team, I worked with Suntory and TMIC (Tmall Innovation Center, Alibaba&apos;s consumer insight and product innovation platform) to research consumers, analyse the category and help develop and launch Qingxiang Oolong Tea.</p>
              </div>
            </div>
          </div>

          <figure className="grid gap-3 lg:pt-24">
            <div className="overflow-hidden border border-black/[0.08] bg-[#eef2e7]">
              <Image
                src="/projects/internship-projects/suntory/suntory-impact-poster.png"
                alt="Suntory Qingxiang Oolong Tea impact poster showing the product, launch process and top new-product GMV result"
                width={3342}
                height={4456}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <figcaption className="text-[13px] leading-relaxed text-black/34 md:text-[14px]">
              Suntory Qingxiang Oolong Tea launch and impact overview.
            </figcaption>
          </figure>
        </header>

        <div className="mx-auto grid w-full max-w-[920px] border-t border-black/[0.08]">
          <article className="grid gap-5 border-b border-black/[0.08] py-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 lg:py-14">
            <p className={sectionLabelClass}>The Challenge</p>
            <div className={`grid max-w-[720px] gap-4 ${bodyClass}`}>
              <p>Traditional tea products were often associated with older consumers and established tea-drinking habits. Meanwhile, the fast-growing sugar-free tea category was becoming crowded with similar health claims, flavours and packaging.</p>
              <p>The challenge was to make tea relevant to a younger urban audience while retaining the quality and credibility associated with Suntory&apos;s tea heritage.</p>
            </div>
          </article>

          <article className="grid gap-5 border-b border-black/[0.08] py-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 lg:py-14">
            <p className={sectionLabelClass}>Target Audience</p>
            <div className={`grid max-w-[720px] gap-4 ${bodyClass}`}>
              <p>We focused on young urban professionals, particularly women who wanted drinks that felt refined, enjoyable and compatible with a health-conscious lifestyle.</p>
              <p>Our target user, represented by the persona “Annie”, cared about reducing sugar but did not want to compromise on flavour or experience. She viewed tea as more than a traditional everyday drink: it could support work, social occasions and more experimental combinations with coffee or cocktails.</p>
              <p>This led to a product direction centred on zero sugar, a light floral flavour and a more contemporary tea-drinking experience.</p>
            </div>
          </article>

          <article className="grid gap-5 py-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 lg:py-14">
            <p className={sectionLabelClass}>My Contribution</p>
            <div className={`grid max-w-[720px] gap-4 ${bodyClass}`}>
              <p>I contributed to brand and competitor research, user research and insight synthesis.</p>
              <p>I helped define the target audience, identify the new-product opportunity and develop the product concept. I then translated this direction into the packaging design, including the visual hierarchy and the communication of Tieguanyin tea, orchid aroma, zero-sugar benefits and the product&apos;s light, contemporary character.</p>
            </div>
          </article>
        </div>

        <article className="mx-auto grid w-full max-w-[1100px] gap-6 px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
            <p className={sectionLabelClass}>Impact</p>
            <p className="max-w-[980px] text-[38px] font-normal leading-[1.02] tracking-[-0.05em] text-black md:text-[54px] lg:text-[66px]">
              No.1 Suntory new product by GMV within six months
            </p>
            <div className={`grid max-w-[720px] gap-4 ${bodyClass}`}>
              <p>Suntory Qingxiang Oolong Tea was successfully launched and became Suntory&apos;s highest-performing new product by GMV within six months of launch.</p>
            </div>
        </article>

        <div className="mx-auto w-full max-w-[1100px] border-y border-black/[0.08] py-12 md:py-14">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4 text-[16px] font-medium leading-relaxed text-black/58 md:gap-x-4 md:text-[18px]">
            {["Brand Research", "User Research", "Opportunity Definition", "Product Concept", "Packaging", "Launch"].map((step, index) => (
              <div key={step} className="flex items-center gap-x-3 md:gap-x-4">
                {index > 0 ? <span className="text-black/22" aria-hidden="true">→</span> : null}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FotileProjectChapter() {
  return (
    <section
      id="fotile-range-hood"
      className="scroll-mt-24 overflow-hidden bg-white px-5 py-24 md:px-10 lg:py-32"
      data-future-sections="Introduction,Contextual Research,Design Development,Outcome"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-24 lg:gap-32">
        <header className="grid gap-10 border-t border-black/[0.08] pt-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] lg:items-center lg:gap-16">
          <div className="grid content-start gap-7 lg:py-4">
            <ProjectHeading
              number="01"
              discipline="Industrial Design"
              studio="Good Matter Design Studio × FOTILE"
              color="#9E2E2D"
            />
            <div className="grid gap-5">
              <h2 className="max-w-[720px] text-[48px] font-normal leading-[0.95] tracking-[-0.06em] text-[#0a0a0a] md:text-[68px] lg:text-[76px]">
                Where Cool Air Meets Cooking Heat
              </h2>
              <p className="max-w-[680px] text-[21px] font-medium leading-tight tracking-[-0.03em] text-black/64 md:text-[27px]">
                Research, product concept and interface design for FOTILE&apos;s A1.i Integrated Cooling Range Hood.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 border-y border-black/[0.08] py-7 sm:grid-cols-2">
              {[
                ["Role", "UI/UX Design Intern"],
                ["Timeline", "Jan 2020 — Sep 2020"],
                ["Location", "Shanghai"],
                ["Scope", "Contextual Research · Product Concept · 3D Form Studies · Interface Design"],
              ].map(([label, value]) => (
                <div key={label} className="grid content-start gap-2">
                  <dt className={sectionLabelClass}>{label}</dt>
                  <dd className="text-[16px] leading-relaxed text-black/58 md:text-[17px]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="grid min-w-0 overflow-hidden">
            <Image
              src="/projects/internship-projects/fotile/fotile-hero.jpg"
              alt="FOTILE A1.i Integrated Cooling Range Hood installed in a contemporary kitchen"
              width={1500}
              height={1140}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto max-h-[640px] w-full object-contain"
              priority
            />
          </figure>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:gap-20">
          <p className={sectionLabelClass}>Introduction</p>
          <div className="grid max-w-[900px] gap-6 border-t border-black/[0.08] pt-8">
            <h3 className={sectionTitleClass}>Rethinking comfort in the Chinese kitchen</h3>
            <div className={`grid max-w-[820px] gap-4 ${bodyClass}`}>
              <p>FOTILE is China&apos;s leading kitchen appliance brand. The Good Matter design team developed a cooling range hood that combines smoke extraction, cooling and easier cleaning for Chinese stir-fry cooking.</p>
              <p>I designed the “Skyline” UI, with a horizon-like glow that changes in size and brightness with the airflow. Launched as the FOTILE A1.i, the product received a 2022 iF Design Award and Gold at the 2022 China Excellent Industrial Design Award.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-t border-black/[0.08] pt-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center lg:gap-16">
          <div className="grid content-start gap-6">
            <p className={sectionLabelClass}>01 — Contextual Research</p>
            <h3 className="text-[38px] font-normal leading-[0.98] tracking-[-0.05em] text-black md:text-[54px]">Understanding the real kitchen</h3>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>The GoodMatter design team visited target users in their homes and conducted focus groups and qualitative research.</p>
              <p>We observed how people cooked, cleaned and used limited kitchen space. The research showed that heat, oil smoke, difficult cleaning and lack of space were closely connected problems.</p>
            </div>
          </div>
          <figure className="grid gap-3">
            <div className="overflow-hidden border border-black/[0.08] bg-[#f5f3f0]">
              <Image
                src="/projects/internship-projects/fotile/contextual-research.png"
                alt="Contextual research with a participant reviewing kitchen layouts and product concepts"
                width={3648}
                height={1812}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="grid gap-1">
              <span className={sectionLabelClass}>Contextual Research</span>
              <span className="text-[13px] leading-relaxed text-black/38 md:text-[14px]">Observing cooking behaviour and testing early assumptions in real homes</span>
            </figcaption>
          </figure>
        </section>

        <section className="grid gap-10 border-t border-black/[0.08] pt-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-center lg:gap-16">
          <figure className="grid gap-3 lg:order-1">
            <div className="overflow-hidden border border-black/[0.08] bg-[#f7f4f2]">
              <Image
                src="/projects/internship-projects/fotile/design-development.png"
                alt="Wall of sketches and design-development studies for the FOTILE range hood"
                width={3648}
                height={1444}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="grid gap-1">
              <span className={sectionLabelClass}>Design Development</span>
              <span className="text-[13px] leading-relaxed text-black/38 md:text-[14px]">Translating research insights into product form and interaction concepts</span>
            </figcaption>
          </figure>

          <div className="grid content-start gap-7 lg:order-2">
            <p className={sectionLabelClass}>02 — Design Development</p>
            <h3 className="text-[38px] font-normal leading-[0.98] tracking-[-0.05em] text-black md:text-[54px]">From Insight to Product</h3>
            <div className={`grid gap-4 ${bodyClass}`}>
              <p>Working with the GoodMatter design team, I supported the development of the product concept, physical form and touchscreen experience.</p>
              <p>For the physical product, we focused on making the range hood easier to clean. The front was designed as a seamless black crystal glass panel that could be wiped clean, without the exposed oil filters found on traditional range hoods.</p>
              <p>We also integrated an extra-long oil cup into the product form. With twice the capacity of a standard oil cup, it significantly reduced how often users needed to empty and clean it.</p>
            </div>
            <div className="grid gap-5 border-y border-black/[0.08] py-7">
              <h4 className="text-[28px] font-normal leading-tight tracking-[-0.04em] text-black md:text-[36px]">Designing the Skyline UI</h4>
              <div className={`grid gap-4 ${bodyClass}`}>
                <p>I designed the “Skyline” touchscreen interface around the product&apos;s cooling and extraction system.</p>
                <p>Blue light represented cool airflow descending from above, while warm orange light represented heat rising from the hob. The two colours met at the centre to form a clear horizon line. The brightness and spread of the glow changed with the airflow level, allowing users to understand changes in the hood&apos;s operation at a glance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-12 border-t border-black/[0.08] pt-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] lg:gap-20">
            <p className={sectionLabelClass}>Outcome</p>
            <div className="grid max-w-[900px] gap-6">
              <h3 className={sectionTitleClass}>From studio concept to commercial product</h3>
              <div className={`grid max-w-[820px] gap-4 ${bodyClass}`}>
                <p>The project developed into FOTILE&apos;s commercially launched A1.i Integrated Cooling Range Hood, combining cooling airflow and smoke extraction within one appliance.</p>
                <p>The Skyline metaphor was carried into the production interface, with its visual treatment refined for the final hidden-glass control panel.</p>
              </div>
            </div>
          </div>

              <figure className="grid place-items-center">
            <div className="aspect-[4/3] w-full max-w-[1100px] overflow-hidden">
              <Image
                src="/projects/internship-projects/fotile/fotile-outcome.jpg"
                alt="Front view of the complete FOTILE A1.i Integrated Cooling Range Hood"
                width={2250}
                height={1500}
                sizes="(min-width: 1280px) 1100px, 100vw"
                loading="eager"
                unoptimized
                className="h-full w-full object-cover object-center"
              />
            </div>
          </figure>

          <div className="grid gap-8 border-y border-black/[0.08] py-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-0">
              <article className="grid content-start gap-7 md:pr-10 lg:pr-16">
                <div className="grid gap-2">
                  <div className="flex h-20 items-center">
                    <Image
                      src="/projects/internship-projects/fotile/awards/ceid-award.webp"
                      alt="China Excellent Industrial Design Award logo"
                      width={441}
                      height={680}
                      className="h-20 w-auto max-w-[150px] object-contain object-left"
                    />
                  </div>
                  <p className="text-[48px] font-normal leading-none tracking-[-0.055em] text-black md:text-[64px]">2022</p>
                  <p className={sectionLabelClass}>China Excellent Industrial Design Award</p>
                  <p className="text-[22px] font-medium uppercase tracking-[0.08em] text-black/72">Gold</p>
                </div>
                <p className={bodyClass}>The FOTILE A1.i received Gold at the 2022 China Excellent Industrial Design Award, one of only ten Gold-winning projects that year.</p>
              </article>

              <article className="grid content-start gap-7 border-t border-black/[0.08] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-16">
                <div className="grid gap-2">
                  <div className="flex h-20 items-center">
                    <Image
                      src="/projects/internship-projects/fotile/awards/if-design-award-2022.png"
                      alt="iF Design Award 2022 logo"
                      width={411}
                      height={211}
                      className="h-20 w-auto max-w-[150px] object-contain object-left"
                    />
                  </div>
                  <p className="text-[48px] font-normal leading-none tracking-[-0.055em] text-black md:text-[64px]">2022</p>
                  <p className={sectionLabelClass}>iF Design Award</p>
                  <p className="text-[22px] font-medium uppercase tracking-[0.08em] text-black/72">Product Design Winner</p>
                </div>
                <div className="grid gap-5">
                  <p className={bodyClass}>The FOTILE A1.i also received a 2022 iF Design Award for its integrated cooling and smoke-extraction experience, ultra-thin form and responsive Skyline interface.</p>
                  <a
                    href="https://ifdesign.com/en/winner-ranking/project/cxw-258-lc15-a1i/334116"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-[#ED1827] underline decoration-[#ED1827] underline-offset-4 transition hover:opacity-70 md:text-[15px]"
                    style={{ color: "#ED1827", textDecoration: "underline", textDecorationColor: "#ED1827" }}
                  >
                    <span>View iF award</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </div>

            <p className="border-t border-black/[0.08] pt-6 text-[14px] leading-relaxed text-black/38 md:text-[15px]">I contributed to the project as a UI/UX Design Intern within the GoodMatter design team. The final product was developed collaboratively with FOTILE.</p>
          </div>
        </section>
      </div>
    </section>
  );
}

export function InternshipProjectsCaseStudy() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      <ProjectChapterNavigation chapters={chapters} tone="light" accent="#9E2E2D" />

      <header id="hero" className="relative grid min-h-[calc(60vh-2rem)] overflow-hidden bg-white px-5 pb-20 pt-32 md:px-10">
        <div className="mx-auto grid min-h-[calc(60vh-10rem)] w-full max-w-[1280px] content-center gap-12">
          <div className="grid max-w-[1080px] gap-7">
            <p className={sectionLabelClass}>{internshipCopy.hero.label}</p>
            <h1 className="max-w-[1100px] text-[58px] font-normal leading-[0.92] tracking-[-0.075em] text-[#0a0a0a] sm:text-[72px] md:text-[96px] lg:text-[112px]">
              {internshipCopy.hero.title}
            </h1>
            <p className="max-w-[760px] text-[18px] font-medium leading-relaxed tracking-[-0.02em] text-black/42 md:text-[22px]">
              {internshipCopy.hero.summary}
            </p>
          </div>

          <dl className="grid max-w-[1080px] gap-8 border-t border-black/[0.08] pt-8 sm:grid-cols-3 sm:gap-6">
            {internshipCopy.hero.metadata.map(([label, value]) => (
              <div key={label} className="grid content-start gap-2">
                <dt className={sectionLabelClass}>{label}</dt>
                {label === "Impact" ? (
                  <dd className="flex min-h-16 items-center gap-5">
                    <Image
                      src="/projects/internship-projects/fotile/awards/if-design-award-2022.png"
                      alt="iF Design Award 2022"
                      width={411}
                      height={211}
                      className="h-16 w-auto object-contain"
                    />
                    <Image
                      src="/projects/internship-projects/fotile/awards/ceid-award.webp"
                      alt="China Excellent Industrial Design Award"
                      width={441}
                      height={680}
                      className="h-16 w-auto object-contain"
                    />
                  </dd>
                ) : (
                  <dd className="text-[16px] leading-relaxed text-black/58 md:text-[18px]">{value}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </header>

      {[...internshipCopy.projects].reverse().map((project) =>
        project.id === "illuminera-suntory" ? <SuntoryProjectChapter key={project.id} /> : <FotileProjectChapter key={project.id} />,
      )}

    </div>
  );
}
