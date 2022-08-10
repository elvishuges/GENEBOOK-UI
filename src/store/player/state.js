export const playerInitialState = {
  currentState: "game-start",
  currentLocation: "",
  collectedItems: [],
  performedActions: [],
  status: {
    life: 0,
  },
};

export default function () {
  return {
    player: { ...JSON.parse(JSON.stringify(playerInitialState)) },
  };
}
