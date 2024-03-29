export const messagesInitialState = {
  gameTitle: "Minha Aventura Textual",
  initialImage: "",
  initialAudio: "",
  gameIntroduction: "Vamos Aprender com aventurais Textuais",
  gameStart: "Start game!",
  gameContinue: "Continue",
  goButton: ">>>",
  contentToBeLoaded: "",
  itemsText: "Items:",
  actionsText: "Actions:",
  exitsText: "Exits:",
  goingTo: "Going to ... ",
  optionsText: "Options:",
  inventoryLinkText: "Inventory",
  inventoryTitle: "## Inventory ##",
  inventoryText: "List of collected items:",
  noItemsCollected: "No items have been collected yet.",
  mapLinkText: "Map",
  mapText: "List of entries and exits performed by the player:",
  creditsLinkText: "Credits",
  creditsTitle: "GEnEbook - A Game Engine for Ebooks",
  creditsText: "Developed by OMITTED.",
  fromLabel: "From:",
  toLabel: "To:",
};

export default function () {
  return {
    messages: { ...JSON.parse(JSON.stringify(messagesInitialState)) },
  };
}
