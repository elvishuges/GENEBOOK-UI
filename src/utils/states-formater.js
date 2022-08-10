import store from "../store";

export default class {
  formatMessages(messages) {
    const messagesCopy = JSON.parse(JSON.stringify(messages));
    return messagesCopy;
  }

  formatPlayer(player) {
    const PalyerCopy = JSON.parse(JSON.stringify(player));
    return PalyerCopy;
  }

  formatActors(actors) {
    const actorsCopy = JSON.parse(JSON.stringify(actors));
    return actorsCopy;
  }
}
