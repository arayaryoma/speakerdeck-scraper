import { parse } from "node-html-parser";
import fetch from "node-fetch";

export interface FetchDecksOpts {
  username: string;
}
export interface Deck {
  id?: string;
  title?: string;
  url?: string;
  previewImageSrc?: string;
}

export async function fetchDecks(opts: FetchDecksOpts): Promise<Array<Deck>> {
  const res = await fetch(`https://speakerdeck.com/${opts.username}`, {
    method: "GET",
  });
  const html = await res.text();
  const root = parse(html);

  const decksEl = root
    .querySelectorAll("div.container")[3]
    .querySelector("div");

  return decksEl
    .querySelectorAll(".col-12.col-md-6.col-lg-4.mb-5")
    .map((deckEl) => {
      const anchor = deckEl.querySelector("a");
      const preview = deckEl.querySelector(".card.deck-preview");

      const deckId = preview.getAttribute("data-id");
      const deckHref = anchor.getAttribute("href");
      const deckUrl = deckHref
        ? "https://speakerdeck.com" + deckHref
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
    });
}
