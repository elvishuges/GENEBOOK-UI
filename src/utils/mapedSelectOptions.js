export const selectGameObjects = ["player", "actors", "location"];

export const selectGameObjectActor = {
  actors: {
    title: "Actors:",
    next: "nextToActor",
    options: ["actor 1", "actor 2", "actor 3"],
  },
  nextToActor: {
    title: "Proprety",
    options: ["location", "collectedItems", "status"],
  },
  location: {
    title: "Location:",
    next: "nextToLocation",
    options: ["location 1", "location 2", "location 3"],
  },
  nextToLocation: {
    title: "Includes:",
    options: [],
  },
  collectedItems: {
    title: "Collected :",
    next: "actorsProperties",
    options: ["collectedItems 1", "collectedItems 2", "collectedItems 3"],
  },
  status: {
    title: "Proprety :",
    options: ["life", "active"],
  },
  life: {
    title: "Equals To :",
    options: [],
  },
  active: {
    title: "Equals To :",
    options: [],
  },
};

export const selectGameObjectPlayer = {
  player: {
    title: "Proprety:",
    options: [
      "currentLocation",
      "collectedItems",
      "performedActions",
      "status",
    ],
  },
  currentLocation: {
    title: "Current Location",
    next: "nextCurrentLocation",
    options: ["Location 2", "Location 3", "Location 1"],
  },
  collectedItems: {
    title: "Collected Items",
    next: "actorsProperties",
    options: ["collectedItems 2", "collectedItems 3", "collectedItems 1"],
  },
  performedActions: {
    title: "Performed Actions",
    options: ["includes"],
  },
  includes: {
    title: "Includes",
    options: [],
  },
  nextCurrentLocation: {
    title: "Equals To:",
    options: [],
  },
  performedActionsProperties: {
    title: "Operator:",
    options: [],
  },
  actorsProperties: {
    title: "Proprety",
    options: ["location", "collectedItems", "status"],
  },
  status: {
    title: "Proprety :",
    options: ["life"],
  },
  life: {
    title: "Operator :",
    options: ["==", "=>", ">", "<", ""],
  },
  "==": {
    title: "Value :",
    options: [],
  },
  "=>": {
    title: "Value :",
    options: [],
  },
  ">": {
    title: "Value :",
    options: [],
  },
  "<": {
    title: "Value :",
    options: [],
  },
};
