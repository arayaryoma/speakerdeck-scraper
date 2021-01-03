const { fetchDecks } = require("../dist");

(async () => {
  const decks = await fetchDecks({ username: "arayaryoma" });
  console.log(decks);
})();
