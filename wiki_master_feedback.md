# Wiki Master Feedback — Comprehensive Review

> **Date:** 6 June 2026  
> **Reviewer:** Based on thorough reading of all 96 wiki content files, all 6 writing-reference books, and the reader-facing website UI  
> **Lens:** The end reader — someone arriving at the Taiping Wiki website who wants to learn, not a historian checking citations


---

## PART 0 — Evaluation of Previous "quality_check.txt" Work

The file `quality_check.txt` contains exactly one line:

> "No banned phrases found in markdown files."

This is not a serious editorial review. It is the output of a script that ran a grep for a handful of forbidden phrases. It tells you nothing about:

- Whether the prose is clear, concise, or engaging
- Whether arguments are properly structured with claims, reasons, and evidence
- Whether the reader can follow the narrative across linked pages
- Whether Chinese terms are explained consistently
- Whether there are factual inconsistencies between files
- Whether the same content is duplicated across multiple pages
- Whether leads hook the reader and endings satisfy
- Whether abstraction is grounded in concrete detail

**Verdict:** The previous "review" is worthless as editorial feedback. It is a mechanical lint check, not reading. This document replaces it with a substantive evaluation.

---

## PART 1 — Executive Summary

### Overall Grade: B+ / Strong, with targeted improvements needed

The Taiping Wiki is a substantial, serious piece of work. At approximately 183,000 words across 96 files, it represents a real scholarly effort. The writing is consistently **clear, balanced, and well-organized**. The handling of Chinese terms — characters + pinyin + English on first use — is exemplary and should be preserved as a house standard.

The strongest files are the **biographical portraits** (Feng Yunshan, Shi Dakai, Hong Rengan, Zeng Guofan) and **thematic essays** (Practice vs. Program, Why Nanjing Not a State, Classification). The weakest are the **thin reference tables** (key_controversies.md, major_campaigns_and_battles.md) and some **overlapping overview pages** that duplicate content without adding depth.

**However**, the wiki has systematic issues that affect the reader experience. These are not individual file problems — they are structural patterns that appear across the corpus.

### The Six Writing-Reference Lenses Applied

Drawing on all six writing craft books, here are the primary frameworks this review applies:

| Book | Core Lens |
|------|-----------|
| **On Writing Well** (Zinsser) | Clarity, simplicity, human warmth, strong leads/endings |
| **Revising Prose** (Lanham) | The Lard Factor, Official Style detection, Paramedic Method |
| **Style: Lessons in Clarity and Grace** (Williams) | Characters as subjects, actions as verbs, old-before-new, cohesion |
| **The Craft of Research** (Booth et al.) | Claims/reasons/evidence/warrants, source credibility, significance tests |
| **The Sense of Style** (Pinker) | Classic style, curse of knowledge, arcs of coherence, concrete imagery |
| **Writing Tools** (Clark) | Ladder of abstraction, show vs. tell, gold coins, narrative engines |

---

## PART 2 — The Reader Experience: UI Context

Before evaluating the writing, it is essential to understand **how readers actually encounter this content**. The site is a Next.js static wiki with:

- **Elegant book-like typography:** Lora 19px body text (1.82 line-height), Playfair Display headings
- **Dual theme:** Light (parchment `#fffaf0`) and Dark (near-black `#1c1613`)
- **Three-column desktop layout:** Left nav (230-300px) | Article (max 840px) | Right TOC (200-280px)
- **Hero section** with full-width background image, dramatic 78px title
- **Scroll-spying TOC** in right sidebar
- **Bidirectional footnotes** with jump-back links
- **Previous/Next page navigation** at article bottom
- **Client-side search** in left sidebar
- **Scroll-driven reveal animations** on content blocks
- **Reading time estimates** computed at 230 WPM

### What This Means for Writing

1. **The hero section** displays the page title in 78px Playfair Display over a dark gradient. Page titles must be concise enough to fit. Long titles like "Taiping Law and Discipline / 太平天国的法律与纪律" will wrap awkwardly.

2. **The TOC is auto-generated from h2/h3 headings.** Every page's heading hierarchy must be logical because readers will scan the TOC before reading the body. Missing or poorly organized headings become immediately visible in the right sidebar.

3. **Footnotes are interactive.** Readers can click a footnote marker, jump to the note, then click a backlink to return. This is excellent UX, but it means footnotes that are bloated with uncited sources (as in several 03_Taiping_State files) create a poor experience — the reader jumps down to find a wall of irrelevant citations.

4. **Previous/Next navigation** chains pages in file order. This means page sequence matters — readers using the nav arrows will flow through the content linearly, which makes **redundancy between adjacent pages** particularly jarring.

5. **Reading time estimates** set expectations. A page labeled "12 min read" that is padded with repetition will frustrate readers who feel their time is being wasted — Zinsser's principle: "The reader plays a major role in the act of writing and must be given room to play it. Don't annoy your readers by over-explaining."

6. **Scroll animations reveal content blocks.** Each section has a visual entrance. This rewards well-structured writing where each section is a coherent unit — and punishes pages where sections are padded or disorganized, because every revealed block raises expectations.



---

## PART 3 — Systematic Issues Across the Corpus

### 3.1 Redundancy: The Overlap Problem

**Severity: High. Affects reader trust and time.**

Zinsser: *"Most first drafts can be cut by 50 percent without losing any information."*
Lanham: *"Prose, unlike beefsteak, does not become more choice when marbled with fat."*

The wiki has significant content duplication across files. A reader following the recommended reading path will encounter the same information repeated in near-identical language:

| Topic | Appears In |
|-------|------------|
| Hong Xiuquan's exam failures | taiping_rebellion.md, 01_before_1850_background.md, hong_xiuquan.md, origins.md — 4 files |
| The Land System's non-implementation | land_system.md, taiping_heavenly_kingdom.md, taiping_rebellion.md, civil_administration.md — 4 files |
| The Yong'an court formation | jintian_uprising.md, guangxi_campaigns_1851_1852.md, 02_jintian_to_nanjing.md — 3 files |
| "The movement that had begun as a Hakka solidarity project..." | hakka_background.md:35 and origins.md:28 — verbatim duplicate sentence |
| The Tianjing Incident narrative | tianjing_incident.md, 04_internal_crisis_and_revival.md, hong_xiuquan.md — 3 files |
| Historiography/political memory | historiography.md, political_memory.md, thematic_essay_later_interpretations.md — 3 files with substantial overlap |
| Xiang/Huai army comparison | xiang_army.md, huai_army.md, qing_counterinsurgency.md, thematic_essay_xiang_huai_power.md, thematic_essay_qing_victory.md — 5 files |

**Rationale:** Some redundancy is acceptable in hypertext — each page should be self-contained enough that a reader landing there directly isn't lost. But the current degree of overlap goes well beyond that. A reader doing the "One-hour route" (reading_path.md) will encounter Hong's exam failure story in the first three pages they open.

**Remedy:** For each repeated topic, designate exactly one "canonical" page that tells the story in full. All other pages should use a **single-sentence summary + link** pattern. This preserves self-containment without duplicating content. Pinker's principle applies: *"The amount of verbiage devoted to a point should match its centrality to the argument."*

### 3.2 The Britannica Problem: Source Credibility

**Severity: Medium-High. Affects scholarly credibility.**

Booth et al. in *The Craft of Research* are unequivocal: *"Few experienced researchers trust Wikipedia, so under no circumstances cite it as a source of evidence."* While Britannica is more reputable than Wikipedia, the same principle applies to **encyclopedias as factual sources for a scholarly project**.

Britannica is cited for substantive claims including:
- The 20 million death toll (taiping_rebellion.md, casualty_estimates.md)
- Hong Xiuquan's cause of death (tianjing.md, 06_final_campaigns.md)
- Basic chronology entries (chronology.md — multiple entries)
- The exam system description (01_before_1850_background.md)
- Several factual claims in notes sections across 03_Taiping_State files

Britannica is a **tertiary source**. Per *The Craft of Research*, tertiary sources "mark the user as a novice" when cited in scholarly work. For demographic data, Ho Ping-ti's work exists. For chronology, the primary chronicles exist (via Michael). For Hong's death, the Qing Veritable Records and Li Xiucheng's confession exist.

**Remedy:** Replace all Britannica citations with primary or reputable secondary sources. Where no better source exists, flag the Britannica citation with a note: "This fact relies on a tertiary encyclopedic source pending verification against primary or specialist secondary scholarship."

### 3.3 Missing Leads and Endings

**Severity: Medium. Affects engagement and memorability.**

Zinsser: *"The most important sentence in any article is the first one."*
Zinsser: *"When you're ready to stop, stop. The perfect ending should take your readers slightly by surprise and yet seem exactly right."*
Clark: *"Place gold coins along the path."*

Many wiki pages have strong leads (feng_yunshan.md, tianjing_incident.md, northern_expedition.md) but others start weakly or end abruptly:

**Weak starts:**
- `taiping_heavenly_kingdom.md` opens with a 67-word sentence that is a list, not a lead: "The Taiping Heavenly Kingdom... was the state created by Hong Xiuquan and his followers during the rebellion (1851–1864). It had a sacred monarch, royal titles, printed books, a capital at Tianjing, rules for worship and conduct, military hierarchy, and ambitious plans for land, family, education, law, and government." — This buries the interesting claim (that it was the largest alternative state between Ming-Qing and 1911) in paragraph 2.
- `casualty_estimates.md` opens with "The Taiping Rebellion was one of the deadliest conflicts in human history" — true but a cliche opening phrase.
- `foreign_actors.md` opens with a functional but dry: "Foreign involvement in the Taiping Civil War spanned diplomatic, military, missionary, and commercial spheres."

**Abrupt endings:**
- `civil_administration.md` ends with "The records are fragmentary." — no synthesis
- `tianjing.md` ends on a Meyer-Fong quotation without a concluding paragraph
- `military_organization.md` ends on naval forces, trailing off
- `taiping_calendar.md` has an excellent ending — use it as the model

**Remedy:** Every page should have a lead paragraph that follows Zinsser's guidance — capture the reader with novelty, paradox, surprise, or a provocative question. Every page should end with either a synthesis, a forward-looking question, or a thematic echo. Model pages: feng_yunshan.md (lead), taiping_calendar.md (ending), northern_expedition.md (ending).

### 3.4 Lard Factor: Academic Padding

**Severity: Low-Medium. Affects readability.**

Lanham's Paramedic Method diagnoses "lard" — unnecessary words that add weight without meaning. The wiki's prose is generally lean, but certain patterns recur:

**Prepositional phrase chains** appear in analytical sections. Lanham's rule: two prepositional phrases = warning, three = problem, four = disaster. The wiki sometimes strings four or five.

**"Is" forms substituting for active verbs:** Several analytical pages overuse "was" and "is" where active verbs would carry more weight. Williams's principle: "Use verbs to name their important actions."

**Hedge clusters** in debate sections: The wiki is generally better than academic average here, but occasional accumulations of "some scholars have suggested that it may be possible to argue that" appear — what Lanham calls "the Normative Undergraduate Sentence."

**Remedy:** Run Lanham's Paramedic Method on the most analytical pages (especially in 03_Taiping_State and 06_Aftermath_and_Memory). Circle prepositions, circle "is" forms, find the real action, rebuild sentences around active verbs.

### 3.5 The Curse of Knowledge

**Severity: Medium. Affects accessibility for new readers.**

Pinker's central thesis: experts cannot imagine what it's like not to know what they know. The wiki assumes reader knowledge in several places:

| Assumed Knowledge | Files Affected |
|-------------------|----------------|
| What the Eight-Legged Essay is, and why it mattered | hong_xiuquan.md, 01_before_1850_background.md |
| What the *lijin* tax was and how it worked | qing_counterinsurgency.md, economy_and_taxation.md |
| Who Robert Morrison was | missionary_sources.md, 01_before_1850_background.md |
| What the "thirty-mile radius" meant around Shanghai | foreign_relations_and_intervention.md, shanghai_lower_yangzi.md |
| What "Sinitic" means as a language classification | hakka_background.md |
| That the Second Opium War happened during the Taiping war | Mentioned in passing, never explained in context |

Pinker's cure: *"Assume too little knowledge rather than too much. The key is to assume your readers are as intelligent and sophisticated as you are, but that they happen not to know something you know."*

**Remedy:** For each "curse of knowledge" instance, add a brief parenthetical explanation — a single sentence, not a digression. Zinsser: *"You can't assume that your readers know what you assume everybody knows."*

### 3.6 The Ladder of Abstraction Problem

**Severity: Medium. Affects vividness and memorability.**

Clark's most-referenced tool: great writing moves between concrete specifics (bloody knives, wedding rings) and abstract meaning (freedom, literacy). **The deadly middle rung** is bureaucratic jargon.

The wiki excels at abstraction — analytical frameworks, historiographical positioning, institutional analysis. It is weaker at the concrete bottom rung — specific scenes, individual experiences, sensory details.

**Where the wiki stays abstract when it should descend:**
- `civil_administration.md` describes the *liang sima* as "simultaneously headman, tax collector, judge, priest, quartermaster, and recruiting sergeant" — good, but no specific *liang sima* is ever named or quoted
- `economy_and_taxation.md` discusses tax categories in the abstract but never describes a specific tax collection episode
- `military_organization.md` describes the hierarchy but never depicts a specific unit in camp or in battle

**Where the wiki does this well (models to follow):**
- `gender_and_family_policy.md` — the tripartite portrait of women in different locations and periods
- `zeng_guofan.md` — "He attempted suicide by drowning himself in the Xiang River — his staff pulled him out."
- `tianjing_incident.md` — specific details of the massacre: "Bodies were left in the streets"
- `ever_victorious_army.md` — Ward's specific death, Gordon's specific moral crisis
- `tianjing_urban_geography.md` — specific buildings, gates, spatial arrangements

Clark: *"Get the name of the dog."* Zinsser: *"There's nothing more interesting than the truth."*

**Remedy:** For every 2-3 paragraphs of abstract analysis, include one paragraph of concrete, specific, sensory detail — a named person doing a specific thing at a specific place and time. The translated primary passages in `translated_primary_passages.md` are excellent raw material waiting to be woven into narrative.

### 3.7 Footnote Hygiene

**Severity: Medium. Affects both credibility and UX.**

Several pages in 03_Taiping_State have bloated notes sections where 15+ footnotes are defined but only 5-6 are cited in the body text. This appears to be a template-copying issue. For the reader, clicking a footnote marker and jumping down to find sources not actually referenced erodes trust. *The Craft of Research*: "Cite the source for every quotation, paraphrase, summary, and for ideas associated with a specific person." The corollary: don't list sources you didn't use.

**Remedy:** Audit every page's notes section. Remove footnotes not cited in the body.

### 3.8 British vs. American Spelling

**Severity: Low. Affects polish.**

`god_worshipping_society.md` uses British spelling ("organised," "labourer," "recognised") while all other files use American spelling ("organized," "laborer," "recognized"). Standardize to one convention.



---

## PART 4 — Factual Issues and Inconsistencies

These are **substantive errors or contradictions** that need correction, not just style issues.

### 4.1 Hong Xiuquan's Exam Failures — Contradiction (HIGH)

| File | Claim |
|------|-------|
| taiping_rebellion.md:15 | "Hong had failed the provincial civil service examinations four times: in 1827 he passed the county-level exam, then failed the provincial juren exam in Canton in 1836, 1837, and 1843." |
| 01_before_1850_background.md:25 | "He failed three times — 1836, 1837, and 1843." |
| hong_xiuquan.md | Does not give a clear count, says "He failed repeatedly" |

**Resolution:** Was it three provincial failures or four? Did the 1827 county-level success count as one of the four? These files must agree. The scholarly consensus (Spence, Michael, Reilly) is that Hong passed the county exam but failed the provincial exam three times (1836, 1837, 1843). The taiping_rebellion.md count of "four" appears to mistakenly include the county-level exam.

### 4.2 Suzhou Executions — Factual Error (CRITICAL)

`casualty_estimates.md:41` states: *"execution of surrendered Taiping commanders by Charles Gordon's orders"*

**This is wrong.** Every other file in the corpus correctly attributes the Suzhou executions to **Li Hongzhang**, not Gordon. li_hongzhang.md, ever_victorious_army.md, suzhou_campaign_1863.md, and 06_final_campaigns.md all agree: Li ordered the executions; Gordon was furious and nearly resigned his command.

**This must be corrected immediately.** It contradicts the established historical record and every other page in the wiki.

### 4.3 Tianjing Incident Death Toll — Inconsistency (MEDIUM)

| File | Estimate |
|------|----------|
| 04_internal_crisis_and_revival.md:12 | "several thousand" |
| wei_changhui.md:33 | "10,000-40,000" |
| tianjing_incident.md:49 | Michael: "2,000-6,000" (with note that follow-up killings may raise the total) |

**Resolution:** These likely refer to different phases (initial massacre vs. subsequent purge). The files should distinguish these phases explicitly rather than presenting different numbers without context.

### 4.4 Taiping Peak Army Strength — Inconsistency (LOW)

| File | Estimate |
|------|----------|
| maps_and_data.md | 300,000-500,000 at peak |
| military_organizations.md | 500,000-600,000 (including camp followers) |

**Resolution:** Agree on one range and use it consistently. Distinguish between combatant strength and total (including camp followers and families).

### 4.5 North-China Herald Issue Count — Inconsistency (LOW)

| File | Count |
|------|-------|
| source_guide.md:87 | "approximately 190 issues from 1850-1864" |
| research_backlog.md:21 | "~3900 issues" (the full run 1850-1941) |

**Resolution:** These are not contradictory (190 is the Taiping-relevant subset; 3900 is the full run). But the numbers should be reconciled with an explanation, or one should be used consistently.

### 4.6 Issachar Roberts Name — Inconsistency (LOW)

| File | Name Used |
|------|-----------|
| hong_xiuquan.md:25 | "Issachar Jacobs Roberts" |
| missionary_sources.md | "Issachar Roberts" (implied) |

**Resolution:** Standardize. "Issachar Jacobs Roberts" appears to be the full name; use it consistently.

---

## PART 5 — File-by-File Highlights

Rather than repeat the subagent analyses (available separately), here are the top files by quality and the files most needing attention.

### Best-in-Class Files (Study These as Models)

| File | Why It Excels |
|------|---------------|
| **feng_yunshan.md** | Perfect biographical lead. Argues a thesis, proves it, closes elegantly. Human warmth, analytical precision. |
| **tianjing_incident.md** | Narrative thriller pacing. Complex event explained without confusion. "Bodies were left in the streets" — five words that do enormous work. |
| **zeng_guofan.md** | Balanced, humane portrait. The suicide attempt anecdote handled without melodrama. Chinese phrase "jie ying zhai, da dai zhang" deployed perfectly. |
| **shi_dakai.md** | Tragedy told with restraint. Short sentences for maximum impact: "The trust was gone." |
| **taiping_calendar.md** | Makes a technical topic (calendar systems) fascinating. Best ending in the corpus. Cultural analysis: why the calendar mattered ideologically. |
| **translated_primary_passages.md** | Outstanding scholarship. Three-tier translation format (original + literal + polished) is a model for bilingual work. Register analysis is rare and valuable. |
| **thematic_essay_practice_vs_program.md** | The seven-question framework (lines 35-37) is the best practical reading tool in the entire wiki. Should be promoted to the Reading Path. |
| **thematic_essay_classification.md** | The single-sentence "best short definition" of the Taiping is a model of compression. Should be the lead, not buried near the end. |
| **land_system.md** | Best-structured page. Chinese block quote with translation is the emotional center. Three-way historiographical debate presented fairly. |
| **northern_expedition.md** | "Not a single battalion returned to Taiping-held territory." — the most powerful line in the war pages. |

### Files Needing Most Attention

| File | Primary Issues |
|------|----------------|
| **casualty_estimates.md** | CRITICAL: Factual error attributing Suzhou executions to Gordon. Must fix immediately. |
| **taiping_heavenly_kingdom.md** | Weak lead (67-word list sentence). Too many topics, not enough depth. Redundant with other pages. |
| **key_controversies.md** | Only 32 lines. Each controversy gets one line. Underweight for its importance. |
| **major_campaigns_and_battles.md** | Only 35 lines. Missing several major campaigns (Sanhe, Jiangxi, Zhejiang, Suzhou). |
| **god_worshipping_society.md** | British spelling inconsistent with rest of corpus. |
| **civil_administration.md** | Notes section bloated with 15+ uncited footnotes. Ends abruptly. |
| **article_template.md** | Too thin. New editors cannot use this without far more guidance, especially for Terms and Debates sections. |
| **reading_path.md** | May contain broken links to files not yet created. Verify all cross-references. |

---

## PART 6 — UI/UX: How the Reader Experience Should Shape Editing

### 6.1 Title Length and the Hero Section

The hero renders page titles at 78px in Playfair Display. Long bilingual titles like "Taiping Law and Discipline / 太平天国的法律与纪律" will wrap to multiple lines in the hero, creating visual clutter. Consider shorter English-only titles for display purposes, with the Chinese title as a subtitle or in the body's first heading.

### 6.2 TOC Scanability

The right sidebar TOC is one of the first things a reader sees. It reveals page structure instantly. Pages with arbitrary or inconsistent heading levels will confuse readers before they read a word. Specifically:

- Pages mixing h2 and h3 without hierarchy logic will produce a chaotic TOC
- Pages that jump from h3 to h2 without warning (going "up" a level) are jarring in the TOC
- The TOC truncates at ~18 entries — pages with very deep heading trees may lose entries

**Audit needed:** Spot-check heading hierarchy on all pages with more than 10 headings.

### 6.3 Footnote UX

The bidirectional footnote system is excellent. But:
- Footnotes that list 15+ sources when only 5 are cited in the body waste the reader's jump
- The "publicly archived" footnotes in bibliography.md with no URL are dead ends
- Footnote text that runs multiple paragraphs without backlinks makes the return journey confusing

### 6.4 Previous/Next Nav Flow

The adjacent page navigation chains files in directory/file order. The current ordering is generally logical within directories, but cross-directory transitions (e.g., from 02_Origins to 03_Taiping_State) may not make narrative sense. Consider whether the reading_path.md order should influence the navigation chain.

### 6.5 Search and Discoverability

Client-side search filters pages by title and excerpt. This means:
- Page titles should include key search terms (most do, but "New Treatise" without "Hong Rengan" or "Zizheng xinpian" in the title reduces discoverability)
- Excerpt text is drawn from the first paragraph — weak leads mean weak search results
- Chinese-character search should work (test with 太平天国, 曾国藩, etc.)

### 6.6 Theme Compatibility

The wiki uses a dual light/dark theme system. All inline styling and callout blocks must be tested in both themes. Currently:
- Callout blocks use hardcoded background colors — verify readability in dark mode
- Code blocks are always dark-themed — fine for both modes due to high contrast
- The accent red (#9f2f25) shifts to gold (#dfa646) in dark mode — link visibility should be verified

---

## PART 7 — Priority Action Plan

### P0 — Must Fix Immediately

1. **Correct factual error:** casualty_estimates.md line 41 — change "Charles Gordon's orders" to "Li Hongzhang's orders"
2. **Resolve exam failure contradiction:** Choose one count (three provincial failures) and apply consistently across taiping_rebellion.md, 01_before_1850_background.md, and hong_xiuquan.md
3. **Fix verbatim duplicate:** origins.md:28 and hakka_background.md:35 have identical sentence — remove one

### P1 — High Priority (Structural)

4. **De-duplicate content:** For the 7 overlap clusters identified in 3.1, designate canonical pages and reduce other pages to summary + link
5. **Replace Britannica citations:** Audit all Britannica footnotes and replace with primary or specialist secondary sources
6. **Clean footnote bloat:** Remove uncited footnotes from 03_Taiping_State pages (civil_administration.md, economy_and_taxation.md, etc.)
7. **Fix weak leads:** Rewrite opening paragraphs for taiping_heavenly_kingdom.md, casualty_estimates.md, foreign_actors.md

### P2 — Medium Priority (Polish)

8. **Standardize spelling:** Convert god_worshipping_society.md from British to American spelling
9. **Add endings:** Write concluding paragraphs for civil_administration.md, tianjing.md, military_organization.md
10. **Resolve death toll inconsistency:** Add phase-distinguishing language to Tianjing Incident death toll mentions
11. **Standardize army strength numbers:** Agree on one peak strength range and use consistently
12. **Cross-reference translation template:** Link translation_notes_template.md to editorial_standards.md translation rules
13. **Expand article_template.md:** Add example fills for Terms and Debates sections

### P3 — Lower Priority (Enhancement)

14. **Descend the ladder of abstraction:** Add concrete scenes to the most abstract pages (civil_administration.md, economy_and_taxation.md, military_organization.md)
15. **Add "gold coins":** Place more specific, memorable details throughout — named individuals, direct quotes, sensory descriptions
16. **Expand thin reference pages:** key_controversies.md, major_campaigns_and_battles.md
17. **Verify reading_path.md links:** Check all cross-references resolve to existing files
18. **Add Chinese-character search testing:** Verify 太平, 曾国藩, 天京, etc. are searchable
19. **Promote thematic_essay_practice_vs_program.md's seven-question framework** to the reading path
20. **Move thematic_essay_classification.md's "best short definition"** to the lead paragraph of that file

---

## PART 8 — What the Writing References Would Say: Direct Quotes Applied

### Zinsser (On Writing Well)

> "The secret of good writing is to strip every sentence to its cleanest components."

**Applied:** The wiki's prose is generally clean, but the analytical pages in 03_Taiping_State occasionally accumulate prepositional chains and nominalizations that obscure the subject-action core. Example from civil_administration.md: "The shortage of qualified personnel was one of the Taiping state's most severe structural weaknesses" could be: "The Taiping state lacked qualified personnel. This crippled rural administration."

> "You are writing for yourself. Don't visualize the mass audience."

**Applied:** The wiki does this well — it does not talk down. But Zinsser also says "you can't assume that your readers know what you assume everybody knows." The curse of knowledge items (3.5) need attention.

> "Every successful piece of nonfiction should leave the reader with one provocative thought that he or she didn't have before. Not two thoughts, or five — just one."

**Applied:** Most pages have a clear central argument. The weakest pages (taiping_heavenly_kingdom.md, campaigns_overview.md) try to cover too much and leave the reader with a list, not a thought.

> "Narrative is the oldest and most compelling method of holding someone's attention; everybody wants to be told a story. Always look for ways to convey your information in narrative form."

**Applied:** The biographical portraits understand this instinctively. The institutional pages (03_Taiping_State) could learn from them.

### Lanham (Revising Prose)

> "The Official Style is built on nouns... the triumph of stasis over action."

**Applied:** The wiki is blessedly free of true Official Style. No page reads like a government report. But the academic register creeps in: "The combination of religious authority, military hierarchy, and weak institutional checks almost certainly produced arbitrary outcomes." Lanham would ask: Who produced arbitrary outcomes? Under what circumstances? Name them.

> "How do I know what I think until I see what I write?"

**Applied:** Lanham's insight — that writing is discovery — explains why the best pages are the ones where the author is clearly working through a problem (practice vs. program, why Nanjing not a state) rather than summarizing received knowledge.

### Williams (Style: Lessons in Clarity and Grace)

> "Use subjects to name the characters in your story. Use verbs to name their important actions."

**Applied:** The wiki generally does this well. The biographical files are exemplary. The institutional files sometimes let abstract nouns ("administration," "system," "structure") occupy subject position where specific actors would be clearer.

### Booth et al. (The Craft of Research)

> "Nothing damages your ethos more than arrogant certainty."

**Applied:** The wiki's consistent use of "Debates" sections and historiographical hedging is a major strength. It acknowledges uncertainty and disagreement without paralysis. This is model scholarly writing for a general audience.

> "If a publication hasn't been peer-reviewed, be suspicious."

**Applied:** The Britannica problem (3.2). Also: several sources marked "Publicly archived" in bibliography.md have no URLs, making them unverifiable.

### Pinker (The Sense of Style)

> "The curse of knowledge is the single best explanation of why good people write bad prose."

**Applied:** See 3.5. The wiki's primary accessibility issue is not vocabulary or complexity — it's assuming background knowledge that many readers won't have.

> "When in doubt, connect. Because of the curse of knowledge, there's a greater danger of prose being confusing from too few connectives than pedantic from too many."

**Applied:** The wiki uses connective tissue well — "however," "nevertheless," "in contrast." But some sections leap between topics without transition sentences.

> "The key is to assume your readers are as intelligent and sophisticated as you are, but that they happen not to know something you know."

**Applied:** This is the North Star for editing the curse of knowledge items.

### Clark (Writing Tools)

> "Get the name of the dog."

**Applied:** The wiki names the major figures. It does not yet name the minor figures — the *liang sima* who kept the army running, the village headman who paid taxes to both sides, the woman who survived the camps. These are the "dogs" whose names would make the history concrete.

> "The easiest thing for a reader to do is to quit reading."

**Applied:** Every weak lead, every duplicated passage, every abstract paragraph without a concrete anchor is a place where a reader might quit. The wiki's overall quality keeps readers engaged, but the systematic issues identified here are exit points.

---

## PART 9 — Conclusion

The Taiping Wiki is a serious, well-executed project with consistently strong writing. The Chinese term handling is exemplary. The biographical and thematic essay pages are genuinely excellent — models of accessible scholarly writing. The core analytical frameworks (Kuhn's militarization thesis, Meyer-Fong's memory studies approach, Reilly's religious-textual analysis) are deployed with sophistication and balance.

The wiki's primary weaknesses are structural: redundancy across overlapping pages, over-reliance on tertiary sources (Britannica), one factual error (Suzhou attribution), and a tendency toward abstraction without enough concrete anchoring. These are fixable through targeted editing, not rewriting.

**The single highest-impact improvement:** De-duplicate the overlap clusters (3.1). A reader encountering Hong's exam failures four times in the first hour will lose trust. A reader encountering it once, told well, will remember it.

**The single most important principle to internalize:** Clark's Ladder of Abstraction. The wiki's analytical superstructure is strong. The concrete foundation needs more named individuals, specific scenes, and sensory detail. The translated primary passages are gold waiting to be mined.

**Final grade: B+.** With the P0 and P1 fixes applied: A-.

