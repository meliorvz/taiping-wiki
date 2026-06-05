"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { wikiSections } from "../content.generated";
import { hrefForSlug, slugifyHeading } from "../lib/wiki";

type WikiChromeProps = {
  children: React.ReactNode;
  currentSlug: string;
  title: string;
  section: string;
  excerpt: string;
  headings: { level: number; text: string }[];
  readingMinutes: number;
  sourcePath: string;
};

export function WikiChrome({
  children,
  currentSlug,
  title,
  section,
  excerpt,
  headings,
  readingMinutes,
  sourcePath,
}: WikiChromeProps) {
  const [query, setQuery] = useState("");
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return wikiSections;
    return wikiSections
      .map((group) => ({
        ...group,
        pages: group.pages.filter(
          (page) =>
            page.title.toLowerCase().includes(q) ||
            page.excerpt.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.pages.length);
  }, [query]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">太</span>
          <span>Taiping Wiki</span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/wiki/00_Start_Here/reading_path">Reading Path</Link>
          <Link href="/wiki/07_Reference/chronology">Chronology</Link>
          <Link href="/wiki/08_Sources_and_Editing/bibliography">Sources</Link>
        </nav>
      </header>

      <section className="hero-band">
        <div className="hero-map" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-copy reveal">
          <div className="eyebrow">
            <span className="mini-mark" aria-hidden="true" />
            <span>{section}</span>
          </div>
          <h1>{title}</h1>
          <p>{excerpt || "A reader-facing archive of the Taiping Rebellion, its state-building experiment, war, sources, and contested memory."}</p>
          <div className="hero-meta">
            <span><b aria-hidden="true">Read</b>{readingMinutes} min read</span>
            <span><b aria-hidden="true">File</b>{sourcePath}</span>
          </div>
        </div>
      </section>

      <div className="wiki-layout">
        <aside className="left-rail" aria-label="Wiki navigation">
          <label className="search-box">
            <span aria-hidden="true">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the wiki"
            />
          </label>
          <div className="nav-groups">
            {filteredSections.map((group) => (
              <details key={group.label} open={group.pages.some((page) => page.slug === currentSlug) || !query}>
                <summary>{group.label}</summary>
                {group.pages.map((page) => (
                  <Link
                    className={page.slug === currentSlug ? "active" : ""}
                    href={hrefForSlug(page.slug)}
                    key={page.slug}
                  >
                    {page.title}
                  </Link>
                ))}
              </details>
            ))}
          </div>
        </aside>

        <article className="article-card">{children}</article>

        <aside className="right-rail" aria-label="Table of contents">
          <div className="toc-card">
            <div className="toc-title">
              <span aria-hidden="true">TOC</span>
              <span>Contents</span>
            </div>
            {headings.length ? (
              headings.slice(0, 18).map((heading, index) => (
                <a
                  className={heading.level === 3 ? "indent" : ""}
                  href={`#${slugifyHeading(heading.text)}`}
                  key={`${heading.level}-${heading.text}-${index}`}
                >
                  {heading.text}
                </a>
              ))
            ) : (
              <p>No chapter headings on this page.</p>
            )}
          </div>
          <div className="stat-panel">
            <span aria-hidden="true">Pages</span>
            <span>{wikiSections.reduce((count, group) => count + group.pages.length, 0)} pages</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
