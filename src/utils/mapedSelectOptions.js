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
    title: "Equals To:",
    lastOption: true,
    options: ["location 1", "location 2", "location 3"],
  },
  collectedItems: {
    title: "Includes:",
    lastOption: true,
    options: ["collectedItems 1", "collectedItems 2", "collectedItems 3"],
  },
  status: {
    title: "Proprety :",
    options: ["life", "active"],
  },
  life: {
    title: "Operator :",
    options: [
      {
        label: "Greater Than",
        value: ">",
      },
      {
        label: "Less Than",
        value: "<",
      },
      {
        label: "Greater or Equals To",
        value: ">=",
      },
      {
        label: "Less or Equals To",
        value: "<=",
      },
      {
        label: "Equals To",
        value: "==",
      },
      {
        label: "Not To",
        value: "!=",
      },
    ],
  },
  active: {
    title: "Equals To :",
    lastOption: true,
    options: ["True", "False"],
  },
  ">": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "<": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  ">=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "<=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "==": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "!=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
};

export const selectGameObjectPlayer = {
  player: {
    lastOption: false,
    title: "Proprety:",
    options: [
      "currentLocation",
      "collectedItems",
      "performedActions",
      "status",
    ],
  },
  currentLocation: {
    title: "Equals to:",
    lastOption: true,
    options: ["Current Location 1", "Current Location 1", "Location 1"],
  },
  collectedItems: {
    title: "Includes:",
    lastOption: true,
    options: ["collectedItems 2", "collectedItems 3", "collectedItems 1"],
  },
  performedActions: {
    title: "Includes:",
    lastOption: true,
    options: ["Performed Action 1", "Performed Action 2"],
  },
  status: {
    title: "Operator :",
    options: ["life"],
  },
  life: {
    title: "Operator :",
    options: [
      {
        label: "Greater Than",
        value: ">",
      },
      {
        label: "Less Than",
        value: "<",
      },
      {
        label: "Greater or Equals To",
        value: ">=",
      },
      {
        label: "Less or Equals To",
        value: "<=",
      },
      {
        label: "Equals To",
        value: "==",
      },
      {
        label: "Not To",
        value: "!=",
      },
    ],
  },
  ">": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "<": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  ">=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "<=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "==": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
  "!=": {
    title: "Value :",
    lastOption: true,
    options: ["0"],
  },
};
