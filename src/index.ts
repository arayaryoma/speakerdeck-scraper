import { parse, HTMLElement } from "node-html-parser";
import fetch from "node-fetch";

export interface FetchDecksOpts {
  username: string;
  startPage?: number;
}
export interface Deck {
  id?: string;
  title?: string;
  url?: string;
  previewImageSrc?: string;
}

const ORIGIN = "https://speakerdeck.com";

export async function fetchDecks(
  opts: FetchDecksOpts,
  decks: Array<Deck> = [],
): Promise<Array<Deck>> {
  const page = opts.startPage ?? 1;
  const params = new URLSearchParams({
    page: page.toString(),
  });
  const res = await fetch(`${ORIGIN}/${opts.username}?${params}`, {
    method: "GET",
  });

  const html = await res.text();
  const root = parse(html);

  const pagenationEl = root.querySelector(".pagination");
  const pageItemEls = pagenationEl?.querySelectorAll(".page-item");
  const lastPageItemEl = pageItemEls?.at(-1);

  const lastPage = parseInt(lastPageItemEl?.text ?? "1", 10);
  return page < lastPage
    ? await fetchDecks({ ...opts, startPage: page + 1 }, [
        ...decks,
        ...extractDeckData(root),
      ])
    : [...decks, ...extractDeckData(root)];
}
function extractDeckData(root: HTMLElement): Array<Deck> {
  const decksEl = root
    .querySelectorAll("div.container")[3]
    .querySelector("div");

  if (!decksEl) return [];

  return decksEl
    .querySelectorAll(".col-12.col-md-6.col-lg-4.mb-5")
    .map((deckEl) => {
      const anchor = deckEl.querySelector("a");
      const preview = deckEl.querySelector(".card.deck-preview");

      if (!anchor || !preview) return null;

      const deckId = preview.getAttribute("data-id");
      const deckHref = anchor.getAttribute("href");
      const deckUrl = deckHref
        ? `https://speakerdeck.com${deckHref}`
        : undefined;
      const title = anchor.getAttribute("title");
      const previewImageSrc = (() => {
        const rawUrl = preview.getAttribute("data-cover-image");
        if (rawUrl === undefined) return undefined;
        const url = new URL(rawUrl);
        return url.origin + url.pathname;
      })();

      return {
        id: deckId,
        title,
        previewImageSrc,
        url: deckUrl,
      };
    })
    .filter((el) => el !== null);
}
