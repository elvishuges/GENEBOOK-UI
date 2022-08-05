export const playerInitialState = {
  currentState: "game-start",
  currentLocation: "",
  collectedItems: [],
  performedActions: [],
  status: {
    life: 5,
  },
};

export default function () {
  return {
    ...JSON.parse(JSON.stringify(playerInitialState)),
  };
}
