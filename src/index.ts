import { parse } from "node-html-parser";

import fetch from "node-fetch";
import { promisify } from "util";

export interface FetchDecksOpts {
  username: string;
}
export interface Deck {
  title: string;
  published: Date;
}
export async function fetchDecks(opts: FetchDecksOpts): Promise<Array<Deck>> {
  const res = await fetch(`https://speakerdeck.com/${opts.username}`, {
    method: "GET",
  });
  const html = await res.text();
  const root = parse(html);
  const decks = root.querySelector(
    "div.container:nth-child(2) > div:nth-child(1) div"
  );

  debugger;

  return [];
}

const timeout = promisify(setTimeout);
(async () => {
  await fetchDecks({ username: "arayaryoma" });
  await timeout(100000);
})();
