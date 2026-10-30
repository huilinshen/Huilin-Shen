import type { Metadata } from "next";
import Image from "next/image";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { ProjectChapterNavigation } from "@/components/projects/ProjectChapterNavigation";
import { ProjectFooterNavigation } from "@/components/projects/ProjectFooterNavigation";
import { OutcomeVideo } from "./OutcomeVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Huawei AI Assistant – Celia | Huilin Shen",
  description: "An intent-first generative AI assist experience across Huawei's ecosystem.",
};

const asset = (name: string) => `/projects/intent-first-experience/${name}`;
const imageSizes: Record<string, [number, number]> = {
  "image24.jpg": [3840, 2160], "image25.jpg": [3840, 2160], "image26.jpg": [3840, 2160],
  "image27.jpg": [3840, 2160], "image28.jpg": [3840, 2160],
  "image52.jpg": [720, 2050], "image66.jpg": [720, 2248],
};
function Figure({ name, alt, caption, wide = false }: { name: string; alt: string; caption: string; wide?: boolean }) {
  const [width, height] = imageSizes[name] ?? [720, 1584];
  return <figure className={wide ? styles.wideFigure : styles.figure}>
    <div className={styles.imageFrame}><Image src={asset(name)} alt={alt} width={width} height={height} sizes={wide ? "(max-width: 760px) 100vw, 1150px" : "(max-width: 760px) 45vw, 360px"} /></div>
    <figcaption>{caption}</figcaption>
  </figure>;
}
function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return <section id={id} className={styles.section}><div className={styles.sectionHead}><span>{number}</span><h2>{title}</h2></div><div className={styles.sectionBody}>{children}</div></section>;
}
const bodyLanguage = [
  ["Default", "Mixed · Relaxed", "default"], ["Low confidence", "Purple · Unshaped", "purple"],
  ["High confidence", "Green · Shaped", "green"], ["Suggestion available", "Gold · Assertive", "gold"],
  ["Empathy", "Pink · Relaxed", "pink"], ["Surprise", "Yellow · Assertive", "yellow"],
  ["Disengaged", "Grey · Unshaped", "grey"], ["Thinking", "Cyan · Shaped", "cyan"],
];
const callSteps = [
  { title: "During the call", text: "Lily sees matched entities and detected intents as she speaks. The Mentions section collects relevant items.", images: ["image44.jpg", "image43.jpg"] },
  { title: "After the call", text: "The call history, transcript and mentioned items remain available for review.", images: ["image46.jpg", "image45.jpg"] },
  { title: "Create a goal", text: "Lily can start from the Phone app, or Celia can suggest a goal. The system gathers the call context into proposed tasks that she can review, customise or add to.", images: ["image48.jpg", "image47.jpg"] },
  { title: "Edit the document", text: "Celia identifies requested changes and presents them through the document's familiar track changes convention.", images: ["image49.jpg", "image51.jpg"] },
  { title: "Coordinate a meeting", text: "A calendar event is proposed and created in the existing Calendar app.", images: ["image53.jpg", "image52.jpg"] },
  { title: "Complete the email", text: "Celia drafts the follow-up, attaches the relevant documents and includes the proposed meeting. Writing-style suggestions remain available.", images: ["image54.jpg"] },
];
const cycleSteps = [
  { title: "A personal signal", text: "Lily tells Celia that her period has started. Celia proposes adjustments to her schedule, work, diet and exercise.", images: ["image57.jpg", "image56.jpg"] },
  { title: "Review and tailor", text: "She can accept all recommendations or change individual suggestions. The same changes can be viewed in the apps that hold the information.", images: ["image58.jpg", "image59.jpg", "image60.jpg"] },
  { title: "Support through the day", text: "The goal view shows the current task and what comes next. A timely Calendar notification prompts a hydration break.", images: ["image61.jpg", "image64.jpg"] },
  { title: "A generated task experience", text: "An individual break opens a full-screen generative timer, shaped around that task.", images: ["image63.jpg", "image62.jpg"] },
  { title: "Dinner at the right moment", text: "Celia surfaces a pre-planned recipe. A detailed view offers complementary actions such as timers and shopping lists, which can move to other devices.", images: ["image65.jpg", "image66.jpg"] },
  { title: "Learn and continue", text: "Lily logs her symptoms and how she feels. The next day, Celia offers updated support based on that information.", images: ["image67.jpg", "image68.jpg"] },
];
function Journey({ steps }: { steps: typeof callSteps }) {
  return <div className={styles.journey}>{steps.map((step, index) => <div className={styles.journeyStep} key={step.title}>
    <div className={styles.stepCopy}><span>{String(index + 1).padStart(2, "0")}</span><h4>{step.title}</h4><p>{step.text}</p></div>
    <div className={styles.phoneRow}>{step.images.map((name, i) => <Figure key={name} name={name} alt={`${step.title}, interface state ${i + 1}`} caption="" />)}</div>
  </div>)}</div>;
}

export default function CeliaCaseStudy() {
  return <main className={styles.page}>
    <GlobalNavigation />
    <ProjectChapterNavigation tone="light" accent="#8779db" chapters={[["Overview", "top"], ["System", "system"], ["Operating model", "operating"], ["Interface", "interface"], ["Celia AI", "celia"], ["Interactions", "interactions"], ["Journeys", "journeys"], ["Deliverables", "deliverables"], ["Outcome", "outcome"]]} />
    <article>
      <header id="top" className={styles.hero}><div className={styles.wrap}>
        <p className={styles.eyebrow}>Huawei · London HMI Laboratory · July 2025</p>
        <h1>Huawei AI Assistant – Celia</h1>
        <p className={styles.lede}>An intent-first generative AI assist experience across Huawei&apos;s ecosystem.</p>
        <div className={styles.heroRule} />
        <div className={styles.introGrid}><p>The Intent-first Experience explores how people could ask an AI system to complete goals instead of navigating each application themselves. Celia turns an intent into a goal with actionable tasks, drawing on services across the ecosystem.</p>
          <dl><div><dt>Project</dt><dd>Intent-first Experience / Celia AI</dd></div><div><dt>My role</dt><dd>First and sole designer for the initial user research and UI design; collaborated with Huawei HQ engineers on handoff</dd></div><div><dt>Discipline</dt><dd>Product Design, UX/UI, Generative UI, Human–AI Interaction</dd></div></dl>
        </div>
      </div></header>
      <div className={styles.wrap}>
        <Section id="system" number="01 / Intent-first System" title="Intents, Goals and Tasks">
          <p className={styles.prose}>The Intent-first System provides the underlying model. The Intent-first Experience is the interface through which people express an intent, shape a goal and act on its tasks.</p>
          <div className={styles.conceptLine}><div><b>Intent</b><span>The raw, unstructured desire. “I want to plan a trip.” It may be immediate, deferred or ambiguous.</span></div><div><b>Goal</b><span>A formalised outcome composed of tasks. “Plan a trip to Tokyo in August.” It has a status, priority and timeline.</span></div><div><b>Task</b><span>An actionable unit within the goal. “Search flights.” It can be generated or user-driven, reordered or partly completed.</span></div></div>
        </Section>
        <Section id="operating" number="02 / Operating model" title="Three ways">
          <div className={styles.principles}><div><h3>Opportunistic</h3><p>Likely parameters appear from context and preferences. “Arrange a holiday to Turkey” could populate dates from calendar availability, while leaving them editable. The presentation calls this “a conversation without words, but instead interface”.</p></div><div><h3>Proactive</h3><p>Signals, routines and predicted needs can surface timely goals before the user explicitly defines them.</p></div><div><h3>Suggestive</h3><p>When an intent is incomplete or hard to express, multimodal exploration helps the user discover and define it.</p></div></div>
        </Section>
        <Section id="interface" number="03 / Interface model" title="Goal-based interfaces">
          <p className={styles.prose}>The screen is a projection of the goal, its decomposition into tasks, its current state and its place in time. The underlying system operates across Huawei&apos;s ecosystem as a service; the experience appears wherever an intent is relevant.</p>
          <div className={styles.entryGrid}><div><Figure name="image3.jpg" alt="Celia AI entry point" caption="01 / Celia AI" /></div><div><Figure name="image4.jpg" alt="Operating system search with a generated goal card" caption="02 / Operating system search" /></div><div><Figure name="image5.jpg" alt="Browser with contextual recipe goal card" caption="03 / First-party browser" /></div><div><Figure name="image6.jpg" alt="Calendar app with contextual Celia component" caption="04 / First-party applications" /></div></div>
        </Section>
        <Section id="celia" number="04 / Celia AI experience" title="Celia's interface">
          <p className={styles.prose}>The proposed Celia AI draw remains available across screens. It brings together typing, speech, camera input and contextual suggestions. Its gradient changes colour and form as digital body language, while leaving the content on screen in view.</p>
          <div className={styles.imagePair}><Figure name="image7.jpg" alt="Celia AI draw showing contextual suggestion on a conversation" caption="The persistent draw" /><Figure name="image9.jpg" alt="Celia chat with an interactive recipe card" caption="Chat can lead into an interactive goal" /></div>
          <h3>Digital Body Language</h3><div className={styles.bodyGrid}>{bodyLanguage.map(([label, description, tone]) => <div key={label}><i className={styles[tone]} /><strong>{label}</strong><span>{description}</span></div>)}</div>
          <p className={styles.prose}>Intent-level suggestions can appear as short text. Goal-level suggestions can become components. A high-confidence suggestion opens the draw slightly in gold; interacting with it reveals the proposed goal.</p>
          <div className={styles.imagePair}><Figure name="image36.jpg" alt="High-confidence suggestion in the gold Celia draw" caption="Suggestion available" /><Figure name="image37.jpg" alt="Expanded Celia suggestion" caption="A suggestion expands into context" /></div>
          <h3>Explore, Goal and Teach</h3><p className={styles.prose}>The Celia AI app is proposed around completing goals. Explore helps people define an intent, Goal manages active work, and Teach learns preferences through simple questions. Conversational chat remains available. Recognised intents can introduce interactive components; Celia may coordinate other agents, support capability discovery and use speakable UI with on-screen awareness.</p>
        </Section>
        <Section id="interactions" number="05 / Experience modes" title="Explore and Goal">
          <p className={styles.prose}>Goal Creation accepts both incomplete and fully described intents. The system resolves missing parameters through an instantiation component, then generates a goal whose tasks and attributes remain editable.</p>
          <h3>Explore: an infinite canvas</h3><p className={styles.prose}>People begin with six verbs or enter from a phrase, photograph, text snippet, incoming message, operating system search, first-party app or notification. Moving across the canvas reveals related possibilities; continuing in a direction adds detail. As the intent becomes more concrete, the shapes grow larger and more regular. Preferences and high-confidence suggestions influence the options.</p>
          <div className={styles.exploreGrid}><Figure name="image24.jpg" alt="Explore canvas with six initial intent verbs" caption="01 / Start from broad verbs" wide /><Figure name="image25.jpg" alt="Explore canvas revealing holiday-related possibilities" caption="02 / Move towards related options" wide /><Figure name="image27.jpg" alt="Explore canvas narrowing to Bali and trip details" caption="03 / Define the intent" wide /><Figure name="image28.jpg" alt="Full-screen holiday goal with flights and itinerary" caption="04 / Enter a detailed goal" wide /></div>
          <p className={styles.prose}>The spoken example develops in the same order: “I want a holiday… a luxury getaway… for two weeks… in August.” Horizontal movement shows similar options; vertical movement reveals different ones. A sufficiently defined intent becomes a detailed, full-screen goal experience.</p>
        </Section>
        <section id="journeys" className={styles.journeySection}><div className={styles.sectionHead}><span>06 / User journeys</span><h2>Two journeys</h2></div>
          <div className={styles.journeyGold}><div className={styles.journeyIntro}><span>Journey 01 / Phone call</span><h3>From conversation to actionable goal</h3><p>A professional request made during a phone call becomes a set of coordinated actions across existing applications.</p></div><Journey steps={callSteps} /></div>
          <div className={styles.journeyCyan}><div className={styles.journeyIntro}><span>Journey 02 / Cycle well-being</span><h3>From personal context to proactive support</h3><p>This conceptual, ongoing goal adapts its individual tasks as Lily&apos;s needs change. It was an exploration, not a released feature.</p></div><Journey steps={cycleSteps} /></div>
        </section>
        <Section id="deliverables" number="07 / Deliverables" title="Design deliverables">
          <p className={styles.prose}>The London HMI Laboratory&apos;s broader multidisciplinary work combined research documents, technical specifications and source code, design guidelines, working prototypes and proof-of-concept implementations. The project progressed from problem and component definitions through research and prototypes.</p>
          <div className={styles.deliverableGrid}><div><h3>Core system components</h3><p>Entity and intent matching, goal creation, instantiation, output, scheduling, portrait and tool selection.</p></div><div><h3>Related explorations</h3><p>Bloom&apos;s AI card language and physical AI concepts including Embody, Ling, Ting and Inner Voice formed part of the wider product family.</p></div></div>
        </Section>
        <section id="outcome" className={styles.outcomeSection}>
          <div className={styles.outcomeHeading}><span>08 / Outcome</span><h2>From proposal to product</h2></div>
          <div className={styles.outcomeGrid}>
            <div className={styles.outcomeCopy}>
              <p>The concept explored detecting entities and intents during and after calls, then turning that context into useful interactions. The broader Intent-first System and both journeys remain exploratory proposals. A related post-call capability reached the product.</p>
              <blockquote>Huawei implemented post-call AI summaries that recognise and provide contextual information about people, events and topics mentioned in conversations.</blockquote>
            </div>
            <OutcomeVideo />
          </div>
        </section>
        <footer className={styles.footer}><ProjectFooterNavigation current="intent-first-experience" /></footer>
      </div>
    </article>
  </main>;
}
