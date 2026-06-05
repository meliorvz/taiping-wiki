import { notFound } from "next/navigation";
import { MarkdownArticle } from "./components/MarkdownArticle";
import { WikiChrome } from "./components/WikiChrome";
import { getPage } from "./lib/wiki";

export default function Home() {
  const page = getPage("");
  if (!page) notFound();

  return (
    <WikiChrome {...page} currentSlug="">
      <MarkdownArticle markdown={page.markdown} sourcePath={page.sourcePath} />
    </WikiChrome>
  );
}
