export const selectGameObjects = ["player", "actor", "location"];

export const selectGameObjectActor = {
  actor: {
    title: "Actors:",
    next: "nextToActor",
    options: ["actor 1", "actor 2", "actor 3"],
  },
  nextToActor: {
    title: "Property:",
    options: ["location", "collectedItems", "status"],
  },
  location: {
    title: "Equals To:",
    lastOption: true,
    options: [],
  },
  collectedItems: {
    title: "Includes:",
    lastOption: true,
    options: [],
  },
  status: {
    title: "Property:",
    options: ["life", "active"],
  },
  life: {
    title: "Operator:",
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
    title: "Equals To:",
    lastOption: true,
    options: ["True", "False"],
  },
  ">": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  ">=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "==": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "!=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
};

export const selectGameObjectPlayer = {
  player: {
    lastOption: false,
    title: "Property:",
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
    options: [],
  },
  collectedItems: {
    title: "Includes:",
    lastOption: true,
    options: [],
  },
  performedActions: {
    title: "Includes:",
    lastOption: true,
    options: [],
  },
  status: {
    title: "Property:",
    options: ["life"],
  },
  life: {
    title: "Operator:",
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
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  ">=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "==": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "!=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
};

export const selectGameObjectLocation = {
  location: {
    title: "Locations:",
    next: "nextToLocation",
    options: [],
  },
  nextToLocation: {
    title: "Property:",
    options: ["visits"],
  },
  visits: {
    title: "Operator:",
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
    ],
  },
  ">": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  ">=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "<=": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
  "==": {
    title: "Value:",
    lastOption: true,
    options: ["0", "1", "2"],
  },
};
