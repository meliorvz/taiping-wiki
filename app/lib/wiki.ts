import { wikiPages } from "../content.generated";

export function normalizeSlug(slug?: string[] | string) {
  if (!slug) return "";
  return Array.isArray(slug) ? slug.join("/") : slug;
}

export function getPage(slug?: string[] | string) {
  const normalized = normalizeSlug(slug);
  return wikiPages.find((page) => page.slug === normalized);
}

export function getAdjacentPages(currentSlug: string) {
  const index = wikiPages.findIndex((page) => page.slug === currentSlug);
  return {
    previous: index > 0 ? wikiPages[index - 1] : null,
    next: index >= 0 && index < wikiPages.length - 1 ? wikiPages[index + 1] : null,
  };
}

export function hrefForSlug(slug: string) {
  return slug ? `/wiki/${slug}` : "/";
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
