# Note to Developer — Translation System

## What was done

On 6 June 2026, the entire Taiping Rebellion wiki (~183,000 words across 87 markdown files) was translated from English to Chinese. All translations live in `/translations/zh/`, which mirrors the original directory structure exactly.

**Files translated**: 87 markdown files covering all 10 content sections.

**Files NOT translated** (editorial infrastructure, kept English-only):
- `FILE_MANIFEST.md`
- `CHANGELOG_SOURCE_INTEGRATION.md`
- `quality_check.txt`
- `08_Sources_and_Editing/claim_map.md`
- `08_Sources_and_Editing/new_source_inventory.md`
- `08_Sources_and_Editing/source_extraction_notes.md`
- `08_Sources_and_Editing/source_processing_log.md`
- `08_Sources_and_Editing/source_database.json`
- `08_Sources_and_Editing/download_books.py`
- `08_Sources_and_Editing/downloads/`
- `wiki_master_feedback.md`

## Directory structure

```
translations/
├── note_to_developer.md            <- This file
└── zh/                             <- Chinese translations
    ├── index.md
    ├── README.md
    ├── 00_Start_Here/
    │   └── reading_path.md
    ├── 01_Main_Story/              (7 files)
    ├── 02_Origins_and_Religion/    (11 files)
    ├── 03_Taiping_State/           (11 files)
    ├── 04_War_and_Campaigns/       (15 files)
    ├── 05_Qing_Response/           (8 files)
    ├── 06_Aftermath_and_Memory/    (13 files)
    ├── 07_Reference/               (13 files)
    ├── 08_Sources_and_Editing/     (5 files — reader-facing only)
    └── 09_Backlog/                 (1 file)
```

Each translated file sits at the exact same relative path as its English original (under `translations/zh/` instead of the project root), preserving the same filename.

## Translation conventions

Each translated file follows these rules:

1. **Header marker**: Every translated file begins with `[Chinese translation — 中文翻译]` on line 1.
2. **Markdown preserved**: All formatting (headings, lists, tables, bold, italic, blockquotes) is kept identical to the English source.
3. **Links unchanged**: Internal wiki links still point to the English filenames (e.g., `[Origins](02_Origins_and_Religion/origins.md)`). The link text is translated, but the target path is not. This means Chinese pages link to English pages by default — see "How to serve both languages" below.
4. **Chinese names in original characters**: Terms like 洪秀全, 太平天国, 曾国藩, 天京 are written in Chinese characters, not romanized.
5. **Dates, numbers, citations unchanged**: Footnote references like `[^michael1]`, dates like `1851年1月11日`, and all other data remain exactly as in the English source.
6. **Natural scholarly Chinese**: Prose is translated into natural, academic Chinese appropriate for a historical reference work.

## How to use the translations

### Option A: Language toggle on the website

The simplest integration for a Next.js site:

1. **Serve both languages** — The existing `app/wiki/[[...slug]]/page.tsx` reads markdown from the project root. Add a language parameter (e.g., `/wiki/zh/...` or a query param `?lang=zh`) to read from `translations/zh/` instead.

2. **Language switcher** — Add a toggle in `WikiChrome.tsx` that sets the language and redirects accordingly. Store preference in a cookie or localStorage.

3. **Link rewriting** — Since Chinese pages link to English filenames, the page component should rewrite links on the Chinese version. For example, when rendering a Chinese page, prefix all internal links with `/zh/` so:
   - `[起源](02_Origins_and_Religion/origins.md)` → `/zh/wiki/02_Origins_and_Religion/origins`
   - English pages remain at `/wiki/02_Origins_and_Religion/origins`

4. **Content generation** — Update `scripts/generate-content.mjs` to also crawl `translations/zh/` and generate a Chinese content index.

### Option B: Separate subpath

Deploy the Chinese wiki at a separate subpath (e.g., `https://taiping.vzfz.me/zh/`), with its own routing that reads from `translations/zh/`.

### Option C: Manual reference

Use the translations as a reference for bilingual editing without integrating them into the public site yet.

## Maintaining translations as the wiki grows

The English wiki is the source of truth. When you edit or add English pages, the Chinese translations need to stay in sync. Here is the maintenance workflow:

### When editing an existing English page

1. Edit the English page as usual.
2. Open the corresponding Chinese file at `translations/zh/<same path>`.
3. Update the same section(s) in the Chinese translation.
4. If the edit is minor (typo, date fix, small clarification), you can update the Chinese directly. For major rewrites, consider retranslating the affected paragraphs.

### When adding a new English page

1. Create the new English page in its appropriate directory.
2. Create the Chinese translation at `translations/zh/<same path>`.
3. Add the `[Chinese translation — 中文翻译]` header on line 1.
4. Follow the translation conventions listed above.

### When deleting an English page

1. Delete the English page.
2. Delete the corresponding Chinese file at `translations/zh/<same path>`.

### Tracking translation freshness

Consider adding a simple metadata block at the top of each translated file to track when it was last synced:

```markdown
[Chinese translation — 中文翻译]
[Last synced with English source: YYYY-MM-DD]
```

This makes it easy to find stale translations. A script could compare git modification dates between English and Chinese files to identify pages that need attention.

### Script for finding stale translations

```bash
#!/bin/bash
# find-stale-translations.sh
# Lists Chinese translations whose English source has been modified more recently

for zh_file in translations/zh/**/*.md; do
    en_file="${zh_file#translations/zh/}"
    if [ -f "$en_file" ] && [ "$en_file" -nt "$zh_file" ]; then
        echo "STALE: $zh_file (English source is newer)"
    fi
done
```

### Recommended commit discipline

- When making a small edit to an English page, update the Chinese translation in the **same commit**.
- When making a large edit, commit the English changes first, then follow up with the Chinese translation in a separate commit with a message like `zh: sync translations for [page name]`.
- When adding a new English page, either include the Chinese translation in the same commit or add a TODO comment to flag it for later translation.

### Adding more languages

To add a third language (e.g., Japanese):

1. Create `translations/ja/` with the same directory structure.
2. Translate files following the same conventions.
3. Update the language switcher and routing logic.
4. Add a note to this file.

## File count summary

| Section | English files | Chinese files |
|---------|--------------|---------------|
| Root | 4 (index.md, README.md + meta) | 2 (index.md, README.md) |
| 00_Start_Here | 1 | 1 |
| 01_Main_Story | 7 | 7 |
| 02_Origins_and_Religion | 11 | 11 |
| 03_Taiping_State | 11 | 11 |
| 04_War_and_Campaigns | 15 | 15 |
| 05_Qing_Response | 8 | 8 |
| 06_Aftermath_and_Memory | 13 | 13 |
| 07_Reference | 13 | 13 |
| 08_Sources_and_Editing | 12 total, 5 reader-facing | 5 |
| 09_Backlog | 1 (research_backlog.md) | 1 |
| **Total** | **~96 content files** | **87 translated** |

## Notes

- The 9 untranslated files are editorial infrastructure (claim maps, processing logs, download scripts, JSON databases) that are only useful in English.
- `wiki_master_feedback.md` was not translated — it is an editorial review document, not reader-facing content.
- If you later decide to translate any of the skipped files, follow the same conventions and add them to `translations/zh/` at the mirrored path.
- The `[Chinese translation — 中文翻译]` marker on line 1 of every file serves as a machine-readable flag. Scripts can use `head -n1` to check whether a file is a translation.
