import Link from "next/link";
import { slugifyHeading } from "../lib/wiki";

type InlinePart = string | React.ReactNode;

function resolveMarkdownHref(href: string, sourcePath: string) {
  if (/^(https?:|mailto:|#)/.test(href) || !href.endsWith(".md")) return href;
  const sourceParts = sourcePath.split("/");
  sourceParts.pop();
  const parts = [...sourceParts, ...href.replace(/\.md$/, "").split("/")];
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") resolved.pop();
    else resolved.push(part);
  }
  return `/wiki/${resolved.join("/")}`;
}

function inline(text: string, sourcePath: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\[\^[^\]]+\])/g;
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{inline(token.slice(2, -2), sourcePath)}</strong>);
    } else if (token.startsWith("*")) {
      parts.push(<em key={key++}>{inline(token.slice(1, -1), sourcePath)}</em>);
    } else if (token.startsWith("[^")) {
      parts.push(<sup key={key++}>{token.slice(2, -1)}</sup>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = resolveMarkdownHref(link[2], sourcePath);
        parts.push(
          <Link key={key++} href={href}>
            {link[1]}
          </Link>,
        );
      }
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function tableBlock(block: string, index: number, sourcePath: string) {
  const rows = block
    .split("\n")
    .filter((row) => row.trim().startsWith("|"))
    .map((row) =>
      row
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim()),
    );
  const [head, separator, ...body] = rows;
  if (!head || !separator?.every((cell) => /^:?-{3,}:?$/.test(cell))) return null;

  return (
    <div className="article-table reveal" key={index}>
      <table>
        <thead>
          <tr>{head.map((cell) => <th key={cell}>{inline(cell, sourcePath)}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell, sourcePath)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calloutBlock(block: string, index: number, sourcePath: string) {
  const match = block.match(/^(Note|Source|Important|Warning|Current state|Full changelog|80\/20|Pasikartojantis process):?\s*(.*)$/i);
  if (!match) {
    return (
      <aside className="article-callout reveal" key={index}>
        {inline(block, sourcePath)}
      </aside>
    );
  }

  const type = match[1].toLowerCase();
  const rest = match[2];
  
  let icon = (
    <svg className="callout-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  );
  let title = match[1];

  if (type === "source" || type === "full changelog") {
    icon = (
      <svg className="callout-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    );
  } else if (type === "important" || type === "warning") {
    icon = (
      <svg className="callout-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    );
  }

  return (
    <aside className={`article-callout reveal callout-${type.replace(/\s+/g, "-")}`} key={index}>
      <div className="callout-header" style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "800", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-color)", marginBottom: "8px" }}>
        {icon}
        <span>{title}</span>
      </div>
      <div className="callout-content" style={{ fontSize: "16px", lineHeight: "1.7", opacity: 0.95 }}>
        {inline(rest || block, sourcePath)}
      </div>
    </aside>
  );
}

export function MarkdownArticle({
  markdown,
  sourcePath,
}: {
  markdown: string;
  sourcePath: string;
}) {
  const blocks = markdown
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.startsWith("```")) {
          return (
            <pre className="reveal" key={index}>
              <code>{block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "")}</code>
            </pre>
          );
        }

        const table = tableBlock(block, index, sourcePath);
        if (table) return table;

        const heading = block.match(/^(#{1,6})\s+(.+)$/);
        if (heading) {
          const level = heading[1].length;
          const text = heading[2].trim();
          const id = slugifyHeading(text);
          if (level === 1) return null;
          const Tag = `h${Math.min(level, 4)}` as keyof JSX.IntrinsicElements;
          return (
            <Tag className="reveal scroll-mt-28" id={id} key={index}>
              {inline(text, sourcePath)}
            </Tag>
          );
        }

        if (block.startsWith("- ") || /^\d+\.\s/.test(block)) {
          const ordered = /^\d+\.\s/.test(block);
          const items = block.split("\n").map((item) => item.replace(/^(-|\d+\.)\s+/, ""));
          const List = ordered ? "ol" : "ul";
          return (
            <List className="reveal" key={index}>
              {items.map((item, itemIndex) => <li key={itemIndex}>{inline(item, sourcePath)}</li>)}
            </List>
          );
        }

        if (block.startsWith(">")) {
          return (
            <blockquote className="reveal" key={index}>
              {inline(block.replace(/^>\s?/gm, ""), sourcePath)}
            </blockquote>
          );
        }

        if (/^(Note|Source|Important|Warning|Current state|Full changelog|80\/20|Pasikartojantis process)/i.test(block)) {
          return calloutBlock(block, index, sourcePath);
        }

        return (
          <p className="reveal" key={index}>
            {inline(block.replace(/\n/g, " "), sourcePath)}
          </p>
        );
      })}
    </div>
  );
}
