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
  const isZh = currentSlug === "zh" || currentSlug.startsWith("zh/");
  const filteredPages = wikiPages.filter((page) => {
    const pageIsZh = page.slug === "zh" || page.slug.startsWith("zh/");
    return isZh === pageIsZh;
  });
  const index = filteredPages.findIndex((page) => page.slug === currentSlug);
  return {
    previous: index > 0 ? filteredPages[index - 1] : null,
    next: index >= 0 && index < filteredPages.length - 1 ? filteredPages[index + 1] : null,
  };
}

export function hrefForSlug(slug: string) {
  return slug ? `/wiki/${slug}` : "/";
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}
