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

        if (/^(Note|Source|Important|Current state|Full changelog|80\/20|Pasikartojantis process)/i.test(block)) {
          return (
            <aside className="article-callout reveal" key={index}>
              {inline(block, sourcePath)}
            </aside>
          );
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
