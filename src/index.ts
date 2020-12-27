import cheerio from "cheerio";
import fetch from "node-fetch";

cheerio.load;

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
  const $ = cheerio.load(html);
  const decks = $(
    "div.container:nth-child(2) > div:nth-child(1) div"
  ).children();
  decks.map((deck) => {
    console.log(deck);
  });

  return [];
}

fetchDecks({ username: "arayaryoma" }).then();
