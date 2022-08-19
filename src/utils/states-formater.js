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

  // adasdasd

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
        requiresToShow: this.formatRequiresToShowFinish(element.requiresToShow),
      };
      itemsFormated.push(item);
    });
    return itemsFormated;
  }

  formatEnds(ends) {
    const endsCopy = JSON.parse(JSON.stringify(ends));
    let endsFormated = [];

    endsCopy.forEach((element) => {
      let end = {
        name: element.name,
        title: element.title,
        text: element.text,
        image: element.image,
        audio: element.audio,
        requiresToFinish: this.formatRequiresToShowFinish(
          element.requiresToFinish
        ),
      };

      endsFormated.push(end);
    });

    return endsFormated;
  }

  formatRequiresToShowFinish(requiresToShowFinish) {
    const conditionsType = requiresToShowFinish.conditionsType || null;
    let result = {
      actions: requiresToShowFinish.actions,
      items: requiresToShowFinish.items,
      conditions: this.convertArrayConditionsToStringConditions(
        requiresToShowFinish.conditions,
        conditionsType
      ),
    };
    return result;
  }

  convertArrayConditionsToStringConditions(conditions, conditionsType) {
    console.log("cond", conditionsType);
    if (!conditions.length) return [];

    let finalStringConditionArray = [];
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
            stringCondition = `${element.operator} ${element.statement}getPlayer(gc).status.life ${operator} ${element.result} `;
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
            stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').status.life ${operator} ${element.result} `;
          }
          if (selectedStatusProprety === "active") {
            stringCondition = `${element.operator} ${element.statement}getActor(gc,'${selectedActor}').status.active == ${element.result} `;
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

      finalStringConditionArray.push(stringCondition);
    });
    finalStringCondition = this.formatConditionArrayToLineString(
      finalStringConditionArray,
      conditionsType
    );

    return "return" + finalStringCondition;
  }

  formatConditionArrayToLineString(conditionsArray, conditionsType) {
    let stringResult = "";
    if (conditionsType === "if") {
      conditionsArray.forEach((condition) => {
        stringResult = stringResult + condition;
      });
    }

    if (conditionsType === "if_else") {
      // ternary
      stringResult = `${conditionsArray[0]} ? ${conditionsArray[1]} : ${conditionsArray[2]} `;
    }

    return stringResult;
  }
}
