import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { ProjectChapterNavigation } from "@/components/projects/ProjectChapterNavigation";
import { ResearchProcessAccordion } from "@/components/projects/ResearchProcessAccordion";
import { CaseStudySubAccordion } from "@/components/projects/CaseStudySubAccordion";
import layouts from "./figma-layouts.json";
import { ProjectFooterNavigation } from "@/components/projects/ProjectFooterNavigation";
import { Visual, Storyboard, ConceptVideo } from "./Experience";
import { getAsset } from "./assets";
import { references } from "./references";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "MycoMap | Huilin Shen",
  description: "A citizen science mobile game for Scottish teenagers. Visual and UI design shaped by field research, co-design and three student engagement sessions.",
};

function Heading({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children?: ReactNode }) {
  return <header className={styles.sectionHeading}><p className={styles.eyebrow}>{number} / {eyebrow}</p><h2>{title}</h2>{children && <div className={styles.intro}>{children}</div>}</header>;
}
function Insight({ label = "Research → design", children }: { label?: string; children: ReactNode }) {
  return <aside className={styles.insight}><span>{label}</span><p>{children}</p></aside>;
}
function FigmaScreens({ frame, items }: { frame: 6 | 7 | 8; items: [string,string][] }) {
  const layout = layouts[String(frame) as "6" | "7" | "8"];
  const altById = new Map(items);
  return <div className={styles.figmaScreens} style={{ aspectRatio: `1190 / ${layout.height}` }}>
    {layout.items.map(item => <div className={styles.figmaScreen} key={item.id} style={{ left: `${item.left / 1190 * 100}%`, top: `${item.top / layout.height * 100}%`, width: `${item.w / 1190 * 100}%`, order: items.findIndex(([id]) => id === item.id) }}><Visual id={item.id} alt={altById.get(item.id) || "MycoMap mobile interface"} sizes="(max-width: 750px) 45vw, 160px" /></div>)}
  </div>;
}
function Cards({ items }: { items: [string, string][] }) {
  return <div className={styles.cards}>{items.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div>;
}
const tutorial: [string,string][] = [
  ["6:imgIPhone1415ProMax94","Tutorial explaining how to photograph a mushroom from the front, top and bottom"],
  ["6:imgIPhone1415ProMax98","Camera guidance confirms the correct mushroom angle"],
  ["6:imgIPhone1415ProMax1001","Camera interface for reviewing mushroom photographs"],
  ["6:imgIPhone1415ProMax1011","Review and upload the observation photographs"],
];
const identification: [string,string][] = [
  ["6:imgIPhone1415ProMax1081","Observation record with photographs and location, ready for identification"],
  ["6:imgIPhone1415ProMax1071","Visual puzzle: choose the shape of the mushroom stem"],
  ["6:imgIPhone1415ProMax109","Visual puzzle: choose the cap shape"],
  ["6:imgIPhone1415ProMax110","Choose the mushroom cap colour"],
  ["6:imgIPhone1415ProMax111","Record how many mushrooms were found"],
  ["6:imgIPhone1415ProMax112","Record the mushroom size"],
  ["6:imgIPhone1415ProMax113","Select the habitat where the mushroom was found"],
  ["6:imgIPhone1415ProMax114","Review a proposed identification before submission"],
];
const rewards: [string,string][] = [
  ["7:imgIPhone1415ProMax80","Player rankings and achievement leaderboard"],
  ["7:imgIPhone1415ProMax81","Competition invitation showing the opponent and potential rewards"],
  ["7:imgIPhone1415ProMax85","Photographing a mushroom during a timed competition"],
  ["7:imgIPhone1415ProMax86","Map guidance during a competition"],
  ["7:imgIPhone1415ProMax103","Time is up: upload the competition observations"],
  ["7:imgIPhone1415ProMax82","Summary of mushrooms recorded during a challenge"],
  ["7:imgIPhone1415ProMax95","Golden badge with experience and level rewards"],
  ["7:imgIPhone1415ProMax84","Player profile with badges, special tasks and quests"],
];

export default function MycoMapPage() {
  return <main className={styles.page}>
    <GlobalNavigation tone="light" />
    <ProjectChapterNavigation tone="light" accent="#7652AC" chapters={[["Hero","overview"],["Outcome","final-design"],["Research process","research"],["Discover","research-stage-1",true],["Student interviews","research-stage-2",true],["Opportunity","research-stage-3",true],["Ideation","research-stage-4",true],["Co-design","research-stage-5",true],["Prototype","research-stage-6",true],["User testing","research-stage-7",true],["Reflection","research-stage-8",true],["References","research-stage-9",true]]} />
    <a href="#final-design" className={styles.skip}>Skip to final design</a>
    <article>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroHeader}>
          <h1>MycoMap</h1>
          <dl className={styles.heroMeta}>
            <dt>Duration</dt><dd aria-hidden="true">|</dd><dd>February–May 2024</dd>
            <dt>Role</dt><dd aria-hidden="true">|</dd><dd>Visual & UI Designer</dd>
            <dt>Focus</dt><dd aria-hidden="true">|</dd><dd>Mobile Game Design · Visual & UI Design</dd>
          </dl>
        </div>
        <section className={styles.heroOverview}><h2>Overview</h2><p>MycoMap is a citizen science mobile game that encourages Scottish teenagers to explore the Dava Way and contribute to environmental data collection through mushroom identification and playful challenges.</p></section>
        <div className={styles.heroRule} />
        <section className={styles.heroThreeColumns}>
          <div><h2>Challenge</h2><p>The Dava Way Association needed greater public engagement and participation, within limited resources.</p></div>
          <div><h2>Goal</h2><p>Create an engaging outdoor learning experience that invites young people to explore the trail.</p></div>
          <div><h2>Approach</h2><p>Connect real mushroom observations with guided identification, playful challenges and social interaction.</p></div>
        </section>
        <div className={styles.heroRule} />
        <section className={styles.heroSolution}><h2>Solution</h2><p>A mobile game and physical trail board that turn mushroom discovery into an approachable citizen science activity.</p></section>
      </section>

      <section id="final-design" className={styles.section}>
        <div className={styles.uiOverview}><Image src="/projects/mycomap/final-ui-overview.png" width={2380} height={1684} alt="MycoMap visual design: angled mobile screens for mushroom identification, competition, friends, maps and rewards, alongside the logo, typography and colour palette" sizes="(max-width:750px) 96vw, 1280px" priority /></div>
        <hr className={styles.designDivider} />
        <div id="identity" className={styles.identityStudy}>
          <div className={styles.identityIntro}><h3>Visual style</h3><p>The mushroom companion became rounder and easier to recognise. The purple fantasy palette came from students’ co-design preferences.</p></div>
          <Image className={styles.inspirationArt} src="/projects/mycomap/character-inspirations-slide12.png" width={368} height={515} alt="Creature illustrations used as visual references for the mushroom companion" sizes="(max-width:750px) 90vw, 280px" />
          <Image className={styles.variantArt} src="/projects/mycomap/character-variants-slide12.png" width={564} height={511} alt="Nine purple mushroom companion variations explored before the final character" sizes="(max-width:750px) 90vw, 360px" />
          <div className={styles.characterStudy}><Visual id="5:imgImage501" alt="Exploratory pencil sketches for the mushroom monster" caption="Early character sketches."/><Visual id="5:img2336" alt="Final mushroom monster character with a purple and mint cap" caption="Refined companion character."/></div>
          <div className={styles.storyIntro}><h3>Background story</h3><p>Players help the companion find and purify infected mushroom friends through identification. Competition and cooperation build purification power and unlock rewards.</p></div>
          <div className={styles.storyArt}><Visual id="5:img3Bc78Bb04Fb095B5821Cfdc611Ba20D1" alt="Fantasy woodland before purification, with dark mushroom silhouettes" caption="Before purification"/><Visual id="5:img1Fe67785234A9107Ee59C4596C0Bc1B1" alt="Fantasy woodland after purification, with glowing purple mushrooms" caption="After purification"/></div>
        </div>

        <hr className={styles.designDivider} />
        <div id="identification" className={styles.identificationCopy}><div><h3>Instructions</h3><p>A short tutorial shows beginners how to photograph a mushroom from several angles.</p></div><div><h3>Identification</h3><p>Visual questions about shape, colour, size and habitat lead to a proposed identification and an observation record.</p></div></div>
        <FigmaScreens frame={6} items={[...tutorial, ["6:imgImage611","Mushroom companion congratulates the player after photographing a mushroom"], ...identification]}/>
        <p className={styles.small}>The identification concept was designed to support careful observation; scientific accuracy was not validated.</p>

        <hr className={styles.designDivider} />
        <div id="rewards" className={styles.rewardStage}><div className={styles.rewardCopy}><h3>Reward & competition</h3><p>Rankings, badges and quests show progress. A timed challenge invites players to find and record mushrooms together or compete for rewards.</p></div><FigmaScreens frame={7} items={rewards}/></div>

        <hr className={styles.designDivider} />
        <div id="friends" className={styles.friendsStage}><FigmaScreens frame={8} items={[
          ["8:imgIPhone1415ProMax1061","Find and add friends"],
          ["8:imgIPhone1415ProMax102","Friends and social messages"],
          ["8:imgIPhone1415ProMax105","Personal QR code for connecting with friends"],
          ["8:imgIPhone1415ProMax146","Map with a visual sticker palette for discoveries"],
          ["8:imgIPhone1415ProMax104","Sharing a sticker with a friend on the map"],
          ["8:imgIPhone1415ProMax162","Reporting a trail problem with visual categories and location"],
        ]}/><div className={styles.friendsCopy}><div><h3>Friends & communication</h3><p>Players can invite friends and receive updates about their discoveries, rewards and progress.</p></div><div><h3>Stickers instead of text</h3><p>Visual stickers let players share finds and report trail problems to the Dava Way Association.</p></div></div></div>

        <hr className={styles.designDivider} />
        <div id="board" className={styles.figmaBoard}><div><Visual id="9:imgImg4218" alt="Laser cutting the physical game board" caption="Making the board prototype."/><Visual id="9:img39Bf17D9A8217Dd38C1A2A6B198162F2" alt="Original mushroom matching board design and construction drawing" caption="Mushroom shapes become a simple matching interaction."/></div><Visual id="9:imgE60Daeba513758Cb2Ee97D28Ebdd71C421" alt="Wooden Dava Way board with sliding mushroom pieces and a QR code" caption="A tangible touchpoint designed for the trail."/><div className={styles.boardCopy}><h3>Interactive game board</h3><p>The proposed waterproof wooden board offers a low-cost, physical invitation to play. A QR code reveals the matching answers and introduces the app.</p></div><Visual id="9:imgFrame11" alt="Phone mockup showing mushroom matching answers and an invitation to download MycoMap"/></div>
      </section>

      <div className={styles.sectionInner}><hr className={styles.sectionDivider} /></div>
      <section id="storyboard" className={styles.storySection}><div className={styles.sectionInner}><h2>Storyboard</h2><Storyboard/></div></section>
      <div className={styles.sectionInner}><hr className={styles.sectionDivider} /></div>
      <section id="film" className={styles.section}><div className={styles.filmIntro}><h2>Concept Film</h2><p>The video explains the app&apos;s features and usage scenarios in more details.</p></div><ConceptVideo/></section>

      <div className={styles.researchWrap}><ResearchProcessAccordion id="research" accent="#7652AC">
      <section id="process" className={styles.process}><div className={styles.sectionInner}><Image className={styles.processImage} src="/projects/mycomap/research-process-overview.jpg" width={2380} height={1684} alt="MycoMap's complete research and design timeline, from understanding the brief and interviewing students through co-design, prototyping, user testing and reflection" sizes="(max-width:750px) 94vw, 1168px" loading="eager" unoptimized /></div></section>

      <CaseStudySubAccordion id="research-stage-1" title="Desk & field research" accent="#7652AC">
      <section id="discover" className={styles.section}>
        <Heading number="06" eyebrow="Discover / Desk & field research" title="Start with the place and its people."/>
        <div className={styles.twoColumns}><div><h3>Understanding the Dava Way</h3><p>The 24-mile route follows the former Highland Railway between Forres and Grantown-on-Spey, passing farmland, woodland and moorland. The Dava Way Association maintains it through volunteer effort, donations and grants.</p><p>Our brief connected three needs: more engagement with the trail, an educational experience for young people, and simple ways to collect environmental data.</p></div><Visual id="13:imgImage170" alt="Woodland and railway viaduct pictured in the Dava Way context research" /></div>
        <h3>Where citizen science fits</h3><p>Citizen science involves members of the public in research. We considered both scientist-led data collection and projects shaped collaboratively with participants.</p>
        <div className={styles.scienceModels}><div><h4>Contributory model</h4><p>Scientists define the project → volunteers contribute data → researchers analyse observations.</p></div><div><h4>Collaborative / co-created model</h4><p>Participants and researchers shape the project together ↔ share knowledge, observations and decisions.</p></div></div>
        <h3>Fieldwork made the constraints tangible</h3><p>On-site observations, an interview with Malcolm Campbell, and conversations with passers-by surfaced practical concerns alongside the trail’s natural appeal.</p>
        <div className={styles.fieldPhotoGrid}><Visual id="15:imgCbb70271Ad7454C471A15784Eb429Fd2" alt="Team field research along the wooded Dava Way" /><Visual id="15:img13217150927181" alt="Outdoor stakeholder conversation during Dava Way fieldwork" /><Visual id="15:imgImage559" alt="Passers-by walking dogs on the trail" /><Visual id="15:img22517067861762" alt="Research team interviewing Malcolm Campbell around a table" caption="Interview with Malcolm Campbell."/></div>
        <Cards items={[["Resources are limited","Funding and volunteers constrain maintenance, publicity and new installations."],["Access needs attention","Uneven surfaces, puddles, fallen trees and unclear entrances affect the walking experience."],["Preserve what matters","Visitors valued the railway history and natural environment, alongside smoother and wider paths."]]}/>
        <Insight label="Opportunity">Create a low-cost reason to discover the trail, with a way for visitors to share observations and report problems.</Insight>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-2" title="First student interviews · 13 February" accent="#7652AC">
      <section id="students" className={styles.section}>
        <Heading number="07" eyebrow="Understand / Student session 01 · 13 February" title="Meet them through what they already love."><p>We asked about everyday routines, hobbies, outdoor activities and their understanding of nature, then analysed the interviews thematically.</p></Heading>
        <Cards items={[["Games sparked enthusiasm","Students noticed monster stickers and mentioned Pokémon. Competition, social play and fresh experiences offered useful starting points."],["Nature felt less familiar","Interviews suggested limited knowledge of species and little regular outdoor participation beyond walking or cycling near home."],["Friends influence participation","Peer influence and online media shaped game choices. A shared experience could create an invitation to explore."]]}/>
        <div className={styles.twoColumns}><Visual id="16:imgImage594" alt="Thematic synthesis of student interviews and original research notes" caption="Interview analysis: outdoor activity, games, education and motivation."/><div className={styles.persona}><Visual id="16:imgImage595" alt="Original illustrated portrait used in the Kieran research persona"/><p className={styles.eyebrow}>Research persona / Kieran</p><h3>Fresh experiences.<br/>Friends. A good game.</h3><p>The team’s 13-year-old persona represents a student in Lossiemouth who enjoys video games and social competition, walks or cycles near home, and has limited motivation for other outdoor activities.</p><p className={styles.small}>A research synthesis, not an individual participant profile.</p></div></div>
        <div className={styles.twoColumns}><Visual id="17:imgImage591" alt="Game analysis mapping genres to competition, storytelling, creativity and social atmosphere"/><Visual id="17:imgImage596" alt="Mind map connecting nature observation, young game players and the Dava Way’s needs"/></div>
        <Insight>Socialising, exploration and accomplishment became the bridge between teenagers’ interests and an outdoor citizen science activity.</Insight>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-3" title="Finding the opportunity" accent="#7652AC">
      <section id="opportunity" className={styles.section}>
        <Heading number="08" eyebrow="Define / Finding the opportunity" title="Why mushrooms? Why a game?"/>
        <div className={styles.tableWrap}><table><caption>Comparing possible observation subjects</caption><thead><tr><th>Subject</th><th>Potential</th><th>Constraint</th></tr></thead><tbody>
          <tr><th>People</th><td>Counts and activity records are accessible.</td><td>A weaker connection to the trail’s natural environment.</td></tr>
          <tr><th>Animals</th><td>Diverse habitats offer interesting species.</td><td>Harder to find and photograph; seasonal availability varies.</td></tr>
          <tr><th>Plants & fungi</th><td>Accessible observation, classification and seasonal records.</td><td>Many plants change slowly; mushrooms offer more variation in place and condition.</td></tr>
          <tr><th>Water, air & soil</th><td>Environmental status can be recorded.</td><td>Less visible variation for the proposed discovery activity.</td></tr>
        </tbody></table></div>
        <Cards items={[["Why mushrooms?","The team found them abundant, easier to photograph than animals, and variable across seasons and weather. Their unpredictable appearance suggested a treasure hunt."],["Why a mobile game?","A phone could combine photographs, location, instructions and social play. The Association’s limited budget and technical skills favoured a shareable digital concept."],["Why gamification?","Students’ enthusiasm for games suggested a way to make unfamiliar observation tasks inviting through visual puzzles, competition and rewards."]]}/>
        <h3>Match the science to beginner capabilities</h3><p>Mushrooms matter as decomposers and plant partners, while gaps in fungal data make observation valuable. We focused on field records: time and location, size, photographs from several angles, growth stage and habitat. Laboratory analysis and microscopy sit beyond this beginner experience.</p>
        <div className={styles.flow}><span>Location & time</span><span>Photos & measurements</span><span>Habitat & growth stage</span><span>Expert analysis beyond the game</span></div>
        <p className={styles.small}>The research considered public platforms including FunDiS, Mushroom Observer and iNaturalist. These were references for possible data sharing, not implemented integrations.</p>
        <Visual id="20:imgImage606" alt="Original benchmark comparison of Pokémon GO and Spirits of Realms" caption="Comparing engaging outdoor play with citizen science data collection."/>
        <div className={styles.twoColumns}><div><h3>Pokémon GO</h3><p>The team valued its characters, rewards and outdoor discovery, while recognising the risk of screen immersion drawing attention away from the environment.</p></div><div><h3>Spirits of Realms</h3><p>Its recording process and backstory informed the concept. The team wanted stronger player interaction and more approachable classification for beginners.</p></div></div>
        <Insight>Bring visual identification and useful records together with a companion, rewards and social play—while keeping attention on the surroundings an ongoing design concern.</Insight>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-4" title="Ideation" accent="#7652AC">
      <section id="ideation" className={styles.section}>
        <Heading number="09" eyebrow="Explore / Ideation" title="Three different ways into nature."><p>The team explored several interaction models before using the next workshop to shape the direction.</p></Heading>
        <div className={styles.ideas}>
          <div><div className={styles.ideaIcon}><Image {...getAsset("21:imgBiEmojiGrin")} alt="" /></div><h3>01 / Emotional visualisation</h3><p>A wearable device would translate contact with plants into expressions on an LED display while collecting environmental readings.</p></div>
          <div><div className={styles.ideaIcon}><Image {...getAsset("21:imgIcons8Music")} alt="" /></div><h3>02 / A musical trail</h3><p>Mushroom bioelectric signals would become music, building a personal soundtrack for the Dava Way journey.</p></div>
          <div><div className={styles.ideaIcon}><Image {...getAsset("21:imgMdiSwordFight")} alt="" /></div><h3>03 / Competitive discovery</h3><p>Players would photograph and upload mushroom observations within a set place and time, competing with one another.</p></div>
        </div>
        <p>These were early concepts. Competitive discovery offered a direction to explore through mushroom matching, genre choices and storytelling with students.</p>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-5" title="Second student workshop · 5 March" accent="#7652AC">
      <section id="codesign" className={styles.section}>
        <Heading number="10" eyebrow="Co-design / Student session 02 · 5 March" title="Let students shape the adventure."><p>We returned with mushroom matching activities, game genre choices and storytelling cards to understand both comprehension and motivation.</p></Heading>
        <div className={styles.workshopGrid}>
          <div className={`${styles.workshopTile} ${styles.workshopMaterials}`}>
            <Visual id="23:imgImage332" alt="Mushroom picture cards used for the matching activity" sizes="(max-width: 750px) 45vw, 190px" />
            <Image src="/projects/mycomap/character-inspirations-slide12.png" width={368} height={515} alt="Illustrated creature cards used as workshop story prompts" sizes="(max-width: 750px) 45vw, 190px" />
          </div>
          <div className={`${styles.workshopTile} ${styles.workshopStories}`}>
            <Visual id="23:imgScreenshot20240306At17431" alt="Illustrated story sequence made for the workshop" sizes="(max-width: 750px) 90vw, 390px" />
            <Visual id="23:story-output" alt="Hand-drawn story cards created by students" sizes="(max-width: 750px) 90vw, 390px" />
          </div>
          <div className={`${styles.workshopTile} ${styles.workshopBoard}`}><Visual id="23:story-board" alt="Collaborative story board with character, event and object prompts" sizes="(max-width: 750px) 90vw, 390px" /></div>
          <div className={styles.workshopTile}><Visual id="23:imgImg438820240306170346" alt="Student worksheet marking favourite game genres" sizes="(max-width: 750px) 90vw, 390px" /></div>
          <div className={styles.workshopTile}><Visual id="23:img13417151386211" alt="Students drawing and arranging story cards during co-design" sizes="(max-width: 750px) 90vw, 390px" /></div>
          <div className={styles.workshopTile}><Visual id="23:imgImage552" alt="Workshop map of the Dava Way with drawings and story materials" sizes="(max-width: 750px) 90vw, 390px" /></div>
        </div>
        <div className={styles.twoColumns}><div><h3>Start with matching</h3><p>Students matched similar mushrooms and chose preferred game genres. Colour drew attention; complex illustrations were harder to distinguish.</p></div><div><h3>Build a story together</h3><p>Event, object and character cards helped students create stories around mushroom discovery on the Dava Way.</p></div></div>
        <div className={styles.tableWrap}><table><caption>What students brought into the design</caption><thead><tr><th>Insight</th><th>Design decision</th></tr></thead><tbody><tr><td>Pictures held attention more than text.</td><td>Visual identification puzzles and sticker communication.</td></tr><tr><td>Fantasy, heroic roles and supernatural stories appealed.</td><td>A mushroom companion and a story about rescuing infected friends.</td></tr><tr><td>Competition and player interaction were engaging.</td><td>Competitive discovery alongside cooperative and social play.</td></tr><tr><td>Rewards could motivate participation.</td><td>Badges, rankings, progression and special challenges.</td></tr></tbody></table></div>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-6" title="From insights to interaction" accent="#7652AC">
      <section id="prototype" className={styles.section}>
        <Heading number="11" eyebrow="Prototype / From insights to interaction" title="Give the adventure a clear structure."><p>We organised the experience around the citizen science sequence, then connected it to rewards, character progression and friends.</p></Heading>
        <div className={styles.prototypeFlows}>
          <Visual id="24:imgImage524" alt="Original information architecture linking home, tutorial, identification, competition, friends and player profile" caption="Information architecture" sizes="(max-width: 750px) 42vw, 300px" />
          <Visual id="24:imgImage607" alt="Game flow from finding a mushroom to collecting information, uploading, rewards and character upgrades" caption="Observation and reward flow" sizes="(max-width: 750px) 48vw, 650px" />
        </div>
        <div className={styles.wireframes}><Visual id="wire:tutorial" alt="Early tutorial wireframes with step-by-step photo guidance" caption="Tutorial" sizes="(max-width: 750px) 92vw, 850px"/><Visual id="wire:identification" alt="Early wireframes for the tutorial and visual mushroom identification" caption="Identification" sizes="(max-width: 750px) 92vw, 850px"/><Visual id="wire:game" alt="Low-fidelity competitive gameplay screens" caption="Gameplay" sizes="(max-width: 750px) 92vw, 850px"/><Visual id="wire:social" alt="Low-fidelity friends and map sticker communication screens" caption="Friends & social interaction" sizes="(max-width: 750px) 92vw, 850px"/></div>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-7" title="Third student testing · 23 April" accent="#7652AC" defaultOpen>
      <section id="testing" className={styles.section}>
        <Heading number="12" eyebrow="Validate / Student session 03 · 23 April" title="Return to students. Refine what matters."><p>We tested low-fidelity interactions and hands-on activities at Lossiemouth High School to examine understanding, gameplay and visual preferences.</p></Heading>
        <div className={styles.testingGrid}>
          <div className={styles.testingColumn}><div className={styles.testingImages}><div className={`${styles.testingReference} ${styles.testingMatching}`} role="img" aria-label="Mushroom silhouettes and photographs used in the matching test"/><Visual id="26:matching" alt="Students testing mushroom silhouette matching with photograph cards" sizes="(max-width: 750px) 45vw, 280px" /></div><h3>01 / Match & identify</h3><p>Matching mushroom silhouettes to photographs tested the observation skills used in identification.</p></div>
          <div className={styles.testingColumn}><div className={styles.testingImages}><div className={`${styles.testingReference} ${styles.testingEyeGame}`} role="img" aria-label="Hidden-mushroom illustration used in the timed search game"/><Visual id="26:imgImage346" alt="Students searching for hidden mushrooms in an illustration" sizes="(max-width: 750px) 45vw, 280px" /></div><h3>02 / Find & compete</h3><p>A timed search for hidden mushrooms explored competitive discovery.</p></div>
          <div className={styles.testingColumn}><div className={styles.testingImages}><Visual id="26:img213217152077431" alt="Three-dimensional paper forest model used in the relay activity" sizes="(max-width: 750px) 45vw, 280px" /><Visual id="26:img212317152077121" alt="Students testing a relay game around the paper forest" sizes="(max-width: 750px) 45vw, 280px" /></div><h3>03 / Share & collaborate</h3><p>Passing mushroom locations between players simulated sharing discoveries in the app.</p></div>
          <div className={styles.testingColumn}><div className={styles.testingImages}><Visual id="26:imgImage502" alt="Mushroom monster variations shown during visual preference testing" sizes="(max-width: 750px) 45vw, 280px" /><Visual id="26:imgImage608" alt="Visual moodboard used to discuss preferred interface styles" sizes="(max-width: 750px) 45vw, 280px" priority unoptimized /></div><h3>04 / Navigate & choose</h3><p>Students tried the low-fidelity prototype and chose preferred character and visual styles.</p></div>
        </div>
        <div className={styles.testingFindings}>
          <div className={styles.testingNotes}>
            <h3>Favourite parts</h3><p>Competition, the mushroom monster and social features.</p>
            <h3>Suggestions</h3><p>More colour and a clearer return button.</p>
            <h3>What changed</h3><p>We used this feedback to refine the visual style and navigation.</p>
            <a href="#final-design" className={styles.textLink}>See the final UI ↑</a>
          </div>
          <Visual id="27:feedback" alt="Original student usability questionnaires with identifying fields redacted in the source" sizes="(max-width: 750px) 92vw, 790px" />
        </div>
      </section>
      </CaseStudySubAccordion>

      <CaseStudySubAccordion id="research-stage-8" title="Reflection & future opportunities" accent="#7652AC">
      <section id="reflection" className={styles.reflection}><div className={styles.sectionInner}>
        <Heading number="13" eyebrow="Reflection" title="What comes next"/>
        <Visual id="30:img15017152595521" alt="Team presenting the MycoMap concept to project stakeholders" />
        <p>Students’ feedback shaped the visual identity, identification puzzles and social features. The Dava Way’s remote location remains a barrier for younger visitors, so encouraging visits would require support beyond the game.</p>
        <p>Future versions could explore more species, places, age groups and seasonal activities. Long-term participation and data quality still need to be tested.</p>
      </div></section>
      </CaseStudySubAccordion>
      <CaseStudySubAccordion id="research-stage-9" title="References" accent="#7652AC">
        <section className={styles.referenceSection} aria-label="References">
          <ol className={styles.referenceList}>{references.map((reference,index)=><li key={index}>{reference}</li>)}</ol>
        </section>
      </CaseStudySubAccordion>
      </ResearchProcessAccordion></div>
      <div className={styles.footerWrap}><ProjectFooterNavigation current="mycomap" tone="light" /></div>
    </article>
  </main>;
}
