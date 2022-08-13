import store from "../store";

export default class {
  formatMessages(messages) {
    const messagesCopy = JSON.parse(JSON.stringify(messages));
    return messagesCopy;
  }

  formatPlayer(player) {
    const playerCopy = JSON.parse(JSON.stringify(player));
    return playerCopy;
  }

  formatActors(actors) {
    const actorsCopy = JSON.parse(JSON.stringify(actors));
    return actorsCopy;
  }

  formatItems(items) {
    const itemsCopy = JSON.parse(JSON.stringify(items));
    let itemsFormated = [];

    itemsCopy.forEach((element) => {
      let item = {
        name: element.name,
        title: element.title,
        description: element.description,
        image: element.image,
        audio: element.audio,
        location: element.location,
        requiresToShow: this.formatRequiresToShow(element.requiresToShow),
      };
      itemsFormated.push(item);
    });
    return itemsFormated;
  }

  formatRequiresToShow(requiresToShow) {
    let result = {
      actions: requiresToShow.actions,
      items: requiresToShow.items,
      conditions: this.convertConditionsToString(requiresToShow.conditions),
    };
    return result;
  }

  convertConditionsToString(conditions) {
    if (!conditions.length) return [];

    let stringTextResult = "return";
    conditions.forEach((element) => {
      const options = element.options;
      let stringText = "";

      if (options[0] === "player") {
        if (options[1] === "currentLocation") {
          stringText = `${element.operator} ${element.statement}getPlayer(gc).currentLocation === '${element.result}' `;
        }

        if (options[1] === "collectedItems") {
          stringText = `${element.operator} ${element.statement}getPlayer(gc).collectedItems.includes('${element.result}') `;
        }

        if (options[1] === "performedActions") {
          stringText = `${element.operator} ${element.statement}getPlayer(gc).performedActions.includes('${element.result}') `;
        }
      }

      stringTextResult = stringTextResult + stringText;
    });
    return stringTextResult;
  }
}
