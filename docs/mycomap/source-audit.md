# MycoMap source and content audit

Source: [Huilin Park / MycoMap, canvas 2:1530](https://www.figma.com/design/qzOvFja4qkekACdVIR0BCU/Huilin-Park?node-id=2-1530).

The 30 numbered frames were inspected with Figma MCP in numerical order, using their text/layer context and screenshots. Page order follows the requested final-design-first narrative. The numbered presentation frames are source material, not full-slide website images.

| Frame | Figma node | Web representation |
| --- | --- | --- |
| 1 | 228:1658 | Project title and overview; final UI artwork leads the outcome section |
| 2 | 228:1927 | Brief, challenge, role and project period |
| 3 | 228:2031 | Stakeholder needs condensed into the brief and challenge |
| 4 | 228:1641 | Large individual final UI screens in the design showcase |
| 5 | 228:2585 | Palette, typeface names, original character sketches, final character and fantasy narrative artwork |
| 6 | 228:2635 | Tutorial, photography, observation record, identification puzzle and submission screens |
| 7 | 228:2658 | Rankings, timed competition, observations, badges and progression |
| 8 | 228:2675 | Friend connections, QR code, messages, stickers and reporting UI |
| 9 | 228:2690 | Physical board, phone touchpoint, original fabrication photographs and drawings |
| 10 | 228:2604 | Complete 18-panel storyboard displayed as one image |
| 11 | 228:2712 | Source film still and embedded YouTube video qZn1o-xL5wU |
| 12 | 228:1946 | Research timeline and three distinct student sessions |
| 13 | 228:2079 | Dava Way context, organisation, original challenge and location photograph |
| 14 | 228:2086 | Simplified contributory and collaborative/co-created citizen science models |
| 15 | 228:1886 | Malcolm Campbell interview, field photographs, visitor observations and practical constraints |
| 16 | 228:1824 | 13 February interviews, thematic synthesis and original persona portrait |
| 17 | 228:1815 | Original game analysis and opportunity mind map; games as a bridge to outdoor learning |
| 18 | 228:2484 | Observation-subject comparison, feasibility and mushroom decision |
| 19 | 228:1801 | Mushroom observation, field data, laboratory limits and possible data platforms |
| 20 | 228:1687 | Original benchmark artefact; Pokémon GO and Spirits of Realms analysis |
| 21 | 228:2535 | Three alternative concepts and their original source icons |
| 22 | 228:1677 | 5 March co-design session, workshop photograph and preparation |
| 23 | 228:1693 | Matching cards, preferences, story artefacts, photographs and insight-to-design table |
| 24 | 228:1723 | Original information architecture and game flow; observation and social loops |
| 25 | 228:2775 | Readable wireframe rows for tutorial, identification, competition and social interactions |
| 26 | 228:2549 | 23 April activities, matching, competition, relay, visual choices and original test photographs |
| 27 | 228:1777 | Source-redacted feedback sheets, what worked, what needed improvement and refinement |
| 28 | 228:2725 | Future subjects, places, ages and community opportunities, consolidated with frame 30 |
| 29 | 228:2755 | Original bibliography in its own final References accordion |
| 30 | 228:1752 | Concise reflection on remote-trail access and future evaluation, with the presentation photograph |

## Asset handling

- 95 local image assets, approximately 24 MB in `public/projects/mycomap/`. The site uses a mix of optimised WebP images and source PNG/JPEG where those formats preserve the supplied artwork.
- `asset-manifest.json` maps each retained file to its source frame and original asset key. Temporary Figma URLs are not used by the page.
- The supplied complete storyboard is shown intact, preserving the original 18-panel sequence.
- Wireframe rows are separated from the original artefacts for readability, reduced on the page and available to enlarge. Photographs and UI retain their proportions. Sideways workshop photographs are rotated upright.
- Feedback uses the Figma-rendered group **228:1780**, preserving the identifying-field redactions present in the source. Raw, unredacted worksheet exports are not included in the public website assets.
- Frame 26's whole-frame context request timed out; its content was recovered from child **228:2553** and checked against the frame screenshot. No essential visual remains blocked.
- Frames 16–17 contain the interview synthesis, persona and diagrams, but no separate interview photograph. The page uses those authentic materials and does not mislabel another workshop photograph as the first interview.

## Editorial decisions and limits

- The brief comes first, followed immediately by the large final UI overview image.
- Huilin's role remains Visual & UI Designer; research and workshops use collaborative wording.
- Research dates are 13 February, 5 March and 23 April 2024. The project period is February–May 2024 as supplied by Huilin.
- Future-development duplication in frames 28 and 30 is consolidated. Remote location, transport, resources and further evaluation remain visible.
- No participant count, measured usability score, launch, platform integration or business impact is inferred. Potential scientific data sharing is described as a concept.
- The source's typeface names are identified in the design showcase while the portfolio's existing global typography is retained.

## Integration

Route: `/projects/mycomap`. Shared `GlobalNavigation` and `ProjectFooterNavigation` are reused. The existing MycoMap homepage card is enabled; the shared project navigation now reaches the page from Community Gardens. The next project follows the existing homepage order and uses the existing fallback to the Who Am I homepage card until that case study is available.
