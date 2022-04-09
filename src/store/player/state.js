export default function () {
  return {
    player: {
      currentState: "game-start",
      currentLocation: "",
      collectedItems: [],
      performedActions: [],
      status: {
        life: 5,
      },
    },
  };
}
