export const firstSelectOptions = [
  {
    label: "player",
    value: "player",
  },
  {
    label: "actor",
    value: "actor",
  },
  {
    label: "location",
    value: "location",
  },
  {
    label: "put in the bag",
    value: "putInTheBag",
  },
  {
    label: "insert action",
    value: "insertAction",
  },
  {
    label: "execute action",
    value: "execAction",
  },
  {
    label: "random Value",
    value: "random",
  },
  {
    label: "True",
    value: "true",
  },
  {
    label: "False",
    value: "false",
  },
];

export const firstSelectActor = {
  actor: {
    title: "Actors:",
    next: "nextToActor",
    options: [],
  },
  nextToActor: {
    title: "Property:",
    options: ["status"],
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
    lastOption: false,
    options: ["life", "active"],
  },
  life: {
    title: "",
    lastOption: true,
    options: [],
  },
  active: {
    title: "",
    lastOption: true,
    options: [],
  },
};

export const firstSelectPlayer = {
  player: {
    lastOption: false,
    title: "Property:",
    options: ["status"],
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
    lastOption: false,
    options: ["life"],
  },
  life: {
    title: "Property:",
    lastOption: true,
    options: [],
  },
};

export const firstSelectLocation = {
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

export const firstSelectPutInTheBag = {
  putInTheBag: {
    title: "Item:",
    next: "nextToPutInTheBag",
    lastOption: false,
    options: [],
  },
  nextToPutInTheBag: {
    title: "Item:",
    lastOption: true,
    options: [],
  },
};

export const firstSelectInsertAction = {
  insertAction: {
    title: "Action:",
    next: "nextToInsertAction",
    lastOption: false,
    options: [],
  },
  nextToInsertAction: {
    title: "action:",
    lastOption: true,
    options: [],
  },
};

export const hasNextfirstSelectOptions = {
  player: {
    hasNext: true,
  },
  actor: {
    hasNext: true,
  },
  location: {
    hasNext: true,
  },
  putInTheBag: {
    hasNext: true,
  },
  insertAction: {
    hasNext: true,
  },
  execAction: {
    hasNext: true,
  },
  random: {
    hasNext: false,
  },
  true: {
    hasNext: false,
  },
  false: {
    hasNext: false,
  },
};
