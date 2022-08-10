export const messagesInitialState = {
  gameTitle: "",
  initialImage: "",
  initialAudio: "",
  gameIntroduction: "",
  gameStart: "",
  gameContinue: "",
  goButton: "",
  contentToBeLoaded: "",
  itemsText: "",
  actionsText: "",
  exitsText: "",
  goingTo: "",
  optionsText: "",
  inventoryLinkText: "",
  inventoryTitle: "",
  inventoryText: "",
  noItemsCollected: "",
  mapLinkText: "",
  mapTitle: "",
  mapText: "",
  creditsLinkText: "",
  creditsTitle: "",
  creditsText: "",
  fromLabel: "",
  toLabel: "",
};

export default function () {
  return {
    messages: { ...JSON.parse(JSON.stringify(messagesInitialState)) },
  };
}
