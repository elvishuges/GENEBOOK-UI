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
      conditions: this.convertArrayConditionsToStringConditions(
        requiresToShow.conditions
      ),
    };
    return result;
  }

  convertArrayConditionsToStringConditions(conditions) {
    if (!conditions.length) return [];

    let finalStringCondition = "";
    conditions.forEach((element) => {
      const options = element.options;
      let stringCondition = "";
      const selectedGameObject = options[0];

      if (selectedGameObject === "player") {
        const selectedPlayerProperty = options[1];
        if (selectedPlayerProperty === "currentLocation") {
          stringCondition = `${element.operator} ${element.statement}getPlayer(gc).currentLocation === '${element.result}' `;
        }

        if (selectedPlayerProperty === "collectedItems") {
          stringCondition = `${element.operator} ${element.statement}getPlayer(gc).collectedItems.includes('${element.result}') `;
        }

        if (selectedPlayerProperty === "performedActions") {
          stringCondition = `${element.operator} ${element.statement}getPlayer(gc).performedActions.includes('${element.result}') `;
        }
        if (selectedPlayerProperty === "status") {
          const selectedStatusProprety = options[2];
          const operator = options[3];
          if (selectedStatusProprety === "life") {
            stringCondition = `${element.operator} ${element.statement}getPlayer(gc).status.life ${operator} ${element.result}  `;
          }
        }
      }

      if (selectedGameObject === "actor") {
        const selectedActor = options[1];
        const selectedActorProperty = options[2];
        if (selectedActorProperty === "location") {
          stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').location === '${element.result}' `;
        }

        if (selectedActorProperty === "collectedItems") {
          stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').collectedItems.includes('${element.result}') `;
        }

        if (selectedActorProperty === "status") {
          const selectedStatusProprety = options[3];
          const operator = options[4];
          if (selectedStatusProprety === "life") {
            stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').status.life ${operator} ${element.result}  `;
          }
          if (selectedStatusProprety === "active") {
            stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').status.active ${operator} ${element.result} `;
          }
        }
      }

      if (selectedGameObject === "location") {
        const selectedLocation = options[1];
        const selectedLocationProperty = options[2];
        const operator = options[3];
        if (selectedLocationProperty === "visits") {
          stringCondition = `${element.operator} ${element.statement}getLocation(gc,'${selectedLocation}').visits ${operator} ${element.result} `;
        }
      }

      finalStringCondition = finalStringCondition + stringCondition;
    });
    return "return" + finalStringCondition;
  }
}
