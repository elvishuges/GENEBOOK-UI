export const selectGameObjects = ["player", "actors", "location"];

export const selectGameObjectActor = {
  actors: {
    title: "Actors:",
    next: "actorsProperties",
    options: ["actor 1", "actor 2", "actor 3"],
  },
  actorsProperties: {
    title: "Proprety",
    options: ["location", "collectedItems", "status"],
  },
  location: {
    title: "Location:",
    next: "actorsProperties",
    options: ["location 1", "location 2", "location 3"],
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
    next: "actorsProperties",
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
    title: "Equals To :",
    options: [],
  },
  "=>": {
    title: "Equals To :",
    options: [],
  },
};
