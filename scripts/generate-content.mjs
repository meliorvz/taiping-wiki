import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const includeRoots = [
  "00_Start_Here",
  "01_Main_Story",
  "02_Origins_and_Religion",
  "03_Taiping_State",
  "04_War_and_Campaigns",
  "05_Qing_Response",
  "06_Aftermath_and_Memory",
  "07_Reference",
  "08_Sources_and_Editing",
];

const sectionLabelsEn = {
  "": "Home",
  "00_Start_Here": "Start Here",
  "01_Main_Story": "Main Story",
  "02_Origins_and_Religion": "Origins & Religion",
  "03_Taiping_State": "Taiping State",
  "04_War_and_Campaigns": "War & Campaigns",
  "05_Qing_Response": "Qing Response",
  "06_Aftermath_and_Memory": "Aftermath & Memory",
  "07_Reference": "Reference",
  "08_Sources_and_Editing": "Sources & Editing",
};

const sectionLabelsZh = {
  "": "首页",
  "00_Start_Here": "从这里开始",
  "01_Main_Story": "主要故事",
  "02_Origins_and_Religion": "起源与宗教",
  "03_Taiping_State": "太平天国政权",
  "04_War_and_Campaigns": "战争与战役",
  "05_Qing_Response": "清廷应对",
  "06_Aftermath_and_Memory": "后事与记忆",
  "07_Reference": "参考资料",
  "08_Sources_and_Editing": "史料与编辑",
};

const excludeFiles = [
  "README.md",
  "08_Sources_and_Editing/article_template.md",
  "08_Sources_and_Editing/translation_notes_template.md",
  "08_Sources_and_Editing/new_source_inventory.md",
  "08_Sources_and_Editing/source_extraction_notes.md",
  "08_Sources_and_Editing/claim_map.md",
  "08_Sources_and_Editing/source_processing_log.md",
  "08_Sources_and_Editing/editorial_standards.md",
];

const order = ["index.md"];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

// English source files
const files = [
  path.join(root, "index.md"),
  ...includeRoots.flatMap((dir) => walk(path.join(root, dir))),
].filter((file) => {
  const relative = path.relative(root, file);
  return !excludeFiles.includes(relative);
});

// Chinese translation files
const zhRoot = path.join(root, "translations", "zh");
const zhFiles = [
  path.join(zhRoot, "index.md"),
  ...includeRoots.flatMap((dir) => {
    const dirPath = path.join(zhRoot, dir);
    try {
      return walk(dirPath);
    } catch (e) {
      return [];
    }
  }),
].filter((file) => {
  const relative = path.relative(zhRoot, file);
  return !excludeFiles.includes(relative);
});

function slugFromRelative(relative, isZh) {
  if (isZh) {
    if (relative === "index.md") return "zh";
    return "zh/" + relative.replace(/\.md$/, "");
  } else {
    if (relative === "index.md") return "";
    return relative.replace(/\.md$/, "");
  }
}

function titleFromMarkdown(markdown, relative) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading ?? path.basename(relative, ".md").replace(/[_-]/g, " ");
}

function excerptFromMarkdown(markdown) {
  let withoutTitle = markdown.replace(/^#\s+.+$/m, "").trim();
  if (withoutTitle.startsWith("[Chinese translation — 中文翻译]")) {
    withoutTitle = withoutTitle.replace(/^\[Chinese translation — 中文翻译\]\r?\n?/, "").trim();
  }
  const paragraph = withoutTitle
    .split(/\n{2,}/)
    .find((block) => {
      const trimmed = block.trim();
      return trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("-") && !/^\d+\.\s/.test(trimmed);
    });
  if (!paragraph) return "";
  const cleaned = paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  
  const isChinese = /[\u4e00-\u9fa5]/.test(cleaned);
  if (isChinese) {
    if (cleaned.length <= 150) return cleaned;
    return cleaned.slice(0, 150).trim() + "...";
  }

  if (cleaned.length <= 220) return cleaned;
  
  let truncated = cleaned.slice(0, 220);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }
  return truncated.trim() + "...";
}

function headingsFromMarkdown(markdown) {
  return [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].replace(/[*_`]/g, "").trim(),
  }));
}

function readingMinutes(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

const pages = [
  ...files.map((file) => {
    const relative = path.relative(root, file);
    const markdown = readFileSync(file, "utf8");
    const sectionKey = relative.includes(path.sep) ? relative.split(path.sep)[0] : "";
    return {
      slug: slugFromRelative(relative, false),
      sourcePath: relative,
      title: titleFromMarkdown(markdown, relative),
      section: sectionLabelsEn[sectionKey] ?? "Wiki",
      markdown,
      excerpt: excerptFromMarkdown(markdown),
      headings: headingsFromMarkdown(markdown),
      readingMinutes: readingMinutes(markdown),
    };
  }),
  ...zhFiles.map((file) => {
    const relative = path.relative(root, file);
    const subRelative = path.relative(zhRoot, file);
    let markdown = readFileSync(file, "utf8");
    if (markdown.startsWith("[Chinese translation — 中文翻译]")) {
      markdown = markdown.replace(/^\[Chinese translation — 中文翻译\]\r?\n?/, "").trim();
    }
    const sectionKey = subRelative.includes(path.sep) ? subRelative.split(path.sep)[0] : "";
    return {
      slug: slugFromRelative(subRelative, true),
      sourcePath: relative,
      title: titleFromMarkdown(markdown, subRelative),
      section: sectionLabelsZh[sectionKey] ?? "维基",
      markdown,
      excerpt: excerptFromMarkdown(markdown),
      headings: headingsFromMarkdown(markdown),
      readingMinutes: readingMinutes(markdown),
    };
  })
];

pages.sort((a, b) => {
  const ai = order.indexOf(a.sourcePath);
  const bi = order.indexOf(b.sourcePath);
  if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  return a.sourcePath.localeCompare(b.sourcePath);
});

const pagesEn = pages.filter(p => !p.slug.startsWith("zh"));
const pagesZh = pages.filter(p => p.slug.startsWith("zh"));

const sectionsEn = Object.values(
  pagesEn.reduce((acc, page) => {
    acc[page.section] ??= { label: page.section, pages: [] };
    acc[page.section].pages.push({
      slug: page.slug,
      title: page.title,
      excerpt: page.excerpt,
      readingMinutes: page.readingMinutes,
    });
    return acc;
  }, {}),
);

const sectionsZh = Object.values(
  pagesZh.reduce((acc, page) => {
    acc[page.section] ??= { label: page.section, pages: [] };
    acc[page.section].pages.push({
      slug: page.slug,
      title: page.title,
      excerpt: page.excerpt,
      readingMinutes: page.readingMinutes,
    });
    return acc;
  }, {}),
);

const output = `/* This file is generated by scripts/generate-content.mjs. */

export type WikiHeading = { level: number; text: string };
export type WikiPage = {
  slug: string;
  sourcePath: string;
  title: string;
  section: string;
  markdown: string;
  excerpt: string;
  headings: WikiHeading[];
  readingMinutes: number;
};

export const wikiPages = ${JSON.stringify(pages, null, 2)} satisfies WikiPage[];

export const wikiSectionsEn = ${JSON.stringify(sectionsEn, null, 2)};

export const wikiSectionsZh = ${JSON.stringify(sectionsZh, null, 2)};
`;

writeFileSync(path.join(root, "app", "content.generated.ts"), output);
