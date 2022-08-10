import store from "../store";

export default class {
  formatMessages(messages) {
    const messagesCopy = JSON.parse(JSON.stringify(messages));
    return messagesCopy;
  }

  formatPlayer(player) {
    const playserCopy = JSON.parse(JSON.stringify(player));
    return playserCopy;
  }
}
