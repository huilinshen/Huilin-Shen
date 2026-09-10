import Image from "next/image";
import { PhotoBoothCamera } from "@/components/about/PhotoBoothHero";
import { ProjectFooterNavigation } from "@/components/projects/ProjectFooterNavigation";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const currentWork = [
  {
    label: "Studio",
    title: "Building my own narrative-driven game studio",
    tone: "studio",
  },
  {
    label: "AI",
    title: "Building AI-native products with vibe coding",
    tone: "ai",
  },
  {
    label: "Coaching",
    title: "Coaching clients as a certified personal trainer",
    tone: "fitness",
  },
  {
    label: "Coffee",
    title: "Always open for coffee chats",
    tone: "coffee-current",
  },
];

export default function AboutPage() {
  return (
    <main className="editorial-about">
      <GlobalNavigation />

      <section
        className="editorial-hero"
        aria-labelledby="about-hero-title"
        style={{ width: "min(1380px, calc(100% - 2.5rem))" }}
      >
        <div className="hero-editorial-copy">
          <p className="section-label">Welcome Plaza / About</p>
          <h1 id="about-hero-title">Meet Huilin</h1>
          <p className="hero-intro">
            A Product & UX Designer in London working across AI-native products, future
            interaction concepts and thoughtful digital experiences.
          </p>
          <a
            className="hero-cv-link"
            href="/assets/Huilin-Shen-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#20b6bd",
              borderBottom: "2px solid #20b6bd",
            }}
          >
            <span>VIEW MY CV</span>
            <span className="hero-cv-link-icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <div className="hero-polaroid-feature" aria-label="Interactive Polaroid camera">
          <PhotoBoothCamera />
        </div>
      </section>

      <section className="editorial-section about-profile-section" aria-labelledby="about-title">
        <p className="section-label">01 / About</p>

        <div className="profile-layout">
          <figure className="about-image-frame">
            <Image
              src="/about/about-huawei-team.png"
              alt="Huawei innovation lab team in a warm retro office illustration"
              fill
              sizes="(max-width: 980px) 100vw, 60vw"
            />
          </figure>

          <div className="about-copy-column">
            <div className="editorial-section-heading">
              <h2 id="about-title">Designing across disciplines.</h2>
            </div>

            <article className="editorial-copy">
              <p>
                During my year at Huawei R&amp;D Innovation Labs, I worked on AI wearables,
                future interaction concepts and design systems. The fast-paced environment
                taught me to learn quickly, prototype ideas and turn complex systems into
                experiences people can understand.
              </p>
              <p>
                My background combines industrial and digital product design, so I&apos;m
                comfortable moving between research, UX, UI, visual design and 3D. I also
                use AI tools and AI-assisted prototyping to explore ideas and iterate
                faster.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="editorial-section beyond-section"
        aria-labelledby="beyond-title"
        style={{ width: "min(1380px, calc(100% - 2.5rem))" }}
      >
        <article className="editorial-copy beyond-copy">
          <p className="section-label">02 / Beyond Design</p>
          <h2 id="beyond-title">More than a designer</h2>
          <p>
            Outside of design, I&apos;m also a certified Level 3 Personal Trainer in the
            UK.
          </p>
          <p>
            Coaching has taught me that both good products and good relationships start
            with understanding people.
          </p>
          <p>
            I enjoy sharing ideas and meeting new people, whether we&apos;re talking about
            design, AI, fitness, or everyday life.
          </p>
        </article>

        <figure className="beyond-image-frame">
          <Image
            src="/about/beyond-design-workshop.png"
            alt="Two designers discussing ideas in a warm retro workshop illustration"
            fill
            sizes="(max-width: 980px) 100vw, 60vw"
          />
        </figure>
      </section>

      <section
        className="editorial-section currently-editorial-section"
        aria-labelledby="currently-title"
        style={{ width: "min(1380px, calc(100% - 2.5rem))" }}
      >
        <div className="editorial-section-heading">
          <p className="section-label">03 / Currently</p>
          <h2 id="currently-title">Current coordinates</h2>
        </div>

        <div className="current-layout">
          <figure className="currently-image-frame">
            <Image
              src="/about/currently-friends-park.png"
              alt="Friends in a warm retro amusement park illustration"
              fill
              sizes="(max-width: 980px) 100vw, 62vw"
            />
          </figure>
          <div className="current-list">
            {currentWork.map((item, index) => (
              <article className={`current-item ${item.tone}`} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="connect-editorial-section"
        aria-labelledby="connect-title"
        style={{ width: "min(1380px, calc(100% - 2.5rem))" }}
      >
        <div className="connect-copy">
          <p className="section-label">04 / Let&apos;s Connect</p>
          <h2 id="connect-title">Say Hello.</h2>
          <p>
            If you&apos;re working on AI, product design, future technology, or simply
            enjoy thoughtful conversations, I&apos;d love to hear from you.
          </p>
        </div>

        <address className="contact-editorial-list">
          <a href="mailto:huilinshen1109@gmail.com">
            <span>Email</span>
            huilinshen1109@gmail.com
          </a>
          <a href="tel:+447419206893">
            <span>Phone</span>
            +44 7419 206893
          </a>
          <a href="https://www.linkedin.com/in/huilinshen" target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            www.linkedin.com/in/huilinshen
          </a>
        </address>
      </section>

      <footer className="mx-auto w-full max-w-[1440px] px-5 py-12 md:px-8 md:py-16 lg:px-10 xl:px-12">
        <ProjectFooterNavigation current="about" />
      </footer>
    </main>
  );
}
