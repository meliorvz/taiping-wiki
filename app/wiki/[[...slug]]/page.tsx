import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { wikiPages } from "../../content.generated";
import { MarkdownArticle } from "../../components/MarkdownArticle";
import { WikiChrome } from "../../components/WikiChrome";
import { getPage, normalizeSlug } from "../../lib/wiki";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return wikiPages
    .filter((page) => page.slug)
    .map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const isZh = page.slug === "zh" || page.slug.startsWith("zh/");
  return {
    title: `${page.title} | ${isZh ? "太平天国维基" : "Taiping Wiki"}`,
    description: page.excerpt,
  };
}

export default async function WikiPage({ params }: PageProps) {
  const { slug } = await params;
  const currentSlug = normalizeSlug(slug);
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <WikiChrome {...page} currentSlug={currentSlug}>
      <MarkdownArticle markdown={page.markdown} sourcePath={page.sourcePath} />
    </WikiChrome>
  );
}
