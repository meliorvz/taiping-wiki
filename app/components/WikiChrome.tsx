"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { wikiSections } from "../content.generated";
import { hrefForSlug, slugifyHeading, getAdjacentPages } from "../lib/wiki";

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

const campaignNodes = [
  { label: "Jintian", top: "72%", left: "48%" },
  { label: "Yong'an", top: "64%", left: "54%" },
  { label: "Wuchang", top: "45%", left: "62%" },
  { label: "Tianjing (Nanjing)", top: "35%", left: "74%" },
  { label: "Shanghai", top: "38%", left: "86%" },
];

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
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [activeHeading, setActiveHeading] = useState("");
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isCurrentlyDark, setIsCurrentlyDark] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("taiping-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      setTheme("system");
    }
  }, []);

  // Update DOM class and track resolved dark state when theme changes
  useEffect(() => {
    const resolveDark = () => {
      if (theme === "dark") return true;
      if (theme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const isDark = resolveDark();
    setIsCurrentlyDark(isDark);

    if (isDark) {
      document.documentElement.classList.add("theme-imperial");
    } else {
      document.documentElement.classList.remove("theme-imperial");
    }

    if (theme === "system") {
      localStorage.removeItem("taiping-theme");
    } else {
      localStorage.setItem("taiping-theme", theme);
    }
  }, [theme]);

  // Listen to system prefers-color-scheme changes when in system mode
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsCurrentlyDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add("theme-imperial");
      } else {
        document.documentElement.classList.remove("theme-imperial");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isCurrentlyDark ? "light" : "dark");
  };

  // Read progress and scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IntersectionObserver for Table of Contents highlighting
  useEffect(() => {
    const headingElements = headings
      .map((h) => document.getElementById(slugifyHeading(h.text)))
      .filter(Boolean);

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by highest intersection ratio to find best match
          const best = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (best?.target.id) {
            setActiveHeading(best.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1.0],
      }
    );

    headingElements.forEach((el) => observer.observe(el!));
    return () => {
      headingElements.forEach((el) => observer.unobserve(el!));
    };
  }, [headings]);

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

  const { previous, next } = useMemo(() => getAdjacentPages(currentSlug), [currentSlug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      {/* Reading Progress Bar */}
      <div className="reading-progress-container" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            <span>太平</span>
            <span>天國</span>
          </span>
          <span className="brand-text">
            <span className="brand-hanzi">太平天國</span>
            <span className="brand-name">Taiping Wiki</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/wiki/00_Start_Here/reading_path">Reading Path</Link>
          <Link href="/wiki/07_Reference/chronology">Chronology</Link>
          <Link href="/wiki/08_Sources_and_Editing/bibliography">Sources</Link>
          
          {/* Theme Switcher Button */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            title={isCurrentlyDark ? "Switch to Parchment (Light)" : "Switch to Imperial (Dark)"}
            aria-label="Toggle theme"
          >
            {isCurrentlyDark ? (
              <>
                <span>📜</span>
                <span>Parchment</span>
              </>
            ) : (
              <>
                <span>🏮</span>
                <span>Imperial</span>
              </>
            )}
          </button>
        </nav>
      </header>

      <section className="hero-band">
        <div className="hero-map" aria-hidden="true">
          {campaignNodes.map((node) => (
            <div
              className="hero-map-node"
              key={node.label}
              style={{ top: node.top, left: node.left }}
              data-label={node.label}
            />
          ))}
        </div>
        <div className="hero-copy reveal">
          <div className="eyebrow">
            <span className="mini-mark" aria-hidden="true" />
            <span>{section}</span>
          </div>
          <h1>{title}</h1>
          <p>{excerpt || "A reader-facing archive of the Taiping Rebellion, its state-building experiment, war, sources, and contested memory."}</p>
          <div className="hero-meta">
            <span><b aria-hidden="true">Read </b>{readingMinutes} min read</span>
            <span><b aria-hidden="true">File </b>{sourcePath}</span>
          </div>
        </div>
      </section>

      <div className="wiki-layout">
        <aside className="left-rail" aria-label="Wiki navigation">
          <label className="search-box">
            <span>Search</span>
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the wiki (Press '/' to focus)"
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
            {filteredSections.length === 0 && (
              <div style={{ padding: "16px", textAlign: "center", color: "var(--fg-muted)" }}>
                No results found.
              </div>
            )}
          </div>
        </aside>

        <article className="article-card">
          {children}

          {/* Adjacent Page Navigation Links */}
          {(previous || next) && (
            <nav className="article-nav-footer" aria-label="Adjacent articles">
              {previous ? (
                <Link className="article-nav-link prev-link" href={hrefForSlug(previous.slug)}>
                  <span className="nav-label">← Previous</span>
                  <span className="nav-title">{previous.title}</span>
                </Link>
              ) : (
                <div style={{ flex: 1 }} />
              )}
              {next ? (
                <Link className="article-nav-link next-link" href={hrefForSlug(next.slug)}>
                  <span className="nav-label">Next →</span>
                  <span className="nav-title">{next.title}</span>
                </Link>
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </nav>
          )}
        </article>

        <aside className="right-rail" aria-label="Table of contents">
          <div className="toc-card">
            <div className="toc-title">
              <span aria-hidden="true">TOC </span>
              <span>Contents</span>
            </div>
            {headings.length ? (
              headings.slice(0, 18).map((heading, index) => {
                const slug = slugifyHeading(heading.text);
                const isActive = activeHeading === slug;
                return (
                  <a
                    className={`${heading.level === 3 ? "indent" : ""} ${isActive ? "active" : ""}`}
                    href={`#${slug}`}
                    key={`${heading.level}-${heading.text}-${index}`}
                  >
                    {heading.text}
                  </a>
                );
              })
            ) : (
              <p>No chapter headings on this page.</p>
            )}
          </div>
          <div className="stat-panel">
            <span aria-hidden="true">Pages </span>
            <span>{wikiSections.reduce((count, group) => count + group.pages.length, 0)} pages</span>
          </div>
        </aside>
      </div>

      {/* Floating Scroll to Top button */}
      <button
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </main>
  );
}

