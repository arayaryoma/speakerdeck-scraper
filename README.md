# speakerdeck-scraper

A module to fetch each slides data from [Speaker Deck](https://speakerdeck.com).

## Usage

### Install

1. `npm install speakerdeck-scraper`

### Functions

#### `fetchDecks(opts: FetchDecksOpts): Promise<Array<Deck>>`

Sends HTTP requests to speakerdeck and parses the response HTML and extracts data.

```ts
const decks = await fetchDecks({ username: "arayaryoma" });
console.log(decks);

/*
[
  {
    id: 'ecf093d9e77e44bcbce960f110122e8f',
    title: 'Performance and cache strategy at NIKKEI',
    previewImageSrc: 'https://files.speakerdeck.com/presentations/ecf093d9e77e44bcbce960f110122e8f/preview_slide_0.jpg',
    url: 'https://speakerdeck.com/arayaryoma/performance-and-cache-strategy-at-nikkei'
  },
  {
    id: 'c42d520b49894499a8256aff7995e6bc',
    title: 'JavaScript Promise API in 2019',
    previewImageSrc: 'https://files.speakerdeck.com/presentations/c42d520b49894499a8256aff7995e6bc/preview_slide_0.jpg',
    url: 'https://speakerdeck.com/arayaryoma/javascript-promise-api-in-2019'
  },
...
]
*/
```
