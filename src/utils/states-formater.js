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

  formatLocations(locstions) {
    const locationsCopy = JSON.parse(JSON.stringify(locstions));
    let locationsFormated = [];

    locationsCopy.forEach((element) => {
      let item = {
        name: element.name,
        title: element.title,
        descriptions: this.formatLocationDescriptions(element.descriptions),
        actions: this.formatLocationActions(element.actions),
        exits: [],
        visits: element.visits,
      };
      locationsFormated.push(item);
    });
    return locationsFormated;
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

  // metodos utilitários

  formatLocationDescriptions(descriptions) {
    let descriptionsFormated = [];
    const returnStringFormat = true;

    descriptions.forEach((element) => {
      let description = {
        text: element.text,
        image: element.image,
        condition: this.convertArrayConditionsToStringConditions({
          conditions: element.condition,
          returnStringFormat: returnStringFormat,
        }),
      };

      descriptionsFormated.push(description);
    });

    return descriptionsFormated;
  }

  formatLocationActions(actions) {
    let actionsFormated = [];

    actions.forEach((element) => {
      let action = {
        name: element.name,
        text: element.text,
        requiresToShow: this.formatLocationsActionRequiresToShow(element),
        requiresToPerform: this.formatLocationsActionRequiresToPerform(element),
        attempts: element.attempts,
      };

      actionsFormated.push(action);
    });

    return actionsFormated;
  }

  formatLocationsActionRequiresToShow(action) {
    const requiresToShowFormated = {
      items: action.requiresToShow.items,
      actions: action.requiresToShow.actions,
      conditions: this.convertArrayConditionsToStringConditions({
        conditions: action.requiresToShow.conditions,
      }),
    };

    return requiresToShowFormated;
  }

  formatLocationsActionRequiresToPerform(action) {
    const requiresToPerformFormated = {
      items: action.requiresToPerform.items,
      actions: action.requiresToPerform.actions,
      conditions: this.convertArrayConditionsToStringConditions({
        conditions: action.requiresToPerform.conditions,
      }),

      success: {
        text: action.requiresToPerform.success.text,
        image: action.requiresToPerform.success.image,
        consequence: this.convertArrayConsequencesToStringConsequence({
          consequences: action.requiresToPerform.success.consequence,
        }),
      },
      failure: {
        text: action.requiresToPerform.failure.text,
        image: action.requiresToPerform.failure.text,
        consequence: this.convertArrayConsequencesToStringConsequence({
          consequences: action.requiresToPerform.failure.consequence,
        }),
      },
    };

    return requiresToPerformFormated;
  }

  formatRequiresToShowFinish(requiresToShowFinish) {
    const conditionsType = requiresToShowFinish.conditionsType || null;
    let result = {
      actions: requiresToShowFinish.actions,
      items: requiresToShowFinish.items,
      conditions: this.convertArrayConditionsToStringConditions({
        conditions: requiresToShowFinish.conditions,
        conditionsType: conditionsType,
      }),
    };
    return result;
  }

  convertArrayConditionsToStringConditions({
    conditions,
    conditionsType = null,
    returnStringFormat = false,
  }) {
    if (!conditions.length) return [];

    let finalStringConditionArray = [];
    let finalStringCondition = "";
    conditions.forEach((element) => {
      const options = element.options;
      let stringCondition = "";
      const selectedGameObject = options[0];

      if (selectedGameObject === "true" || selectedGameObject === "false") {
        stringCondition = ` ${selectedGameObject} `;
      }

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

    const finalResult = "return" + finalStringCondition;

    return returnStringFormat ? finalResult : [finalResult];
  }

  convertArrayConsequencesToStringConsequence({
    consequences,
    returnStringFormat = false,
  }) {
    if (!consequences.length) {
      return "";
    }
    let finalStringConsequence = "";

    consequences.forEach((element) => {
      const options = element.options;
      let stringConsequence = "";

      let assignmentOperator = this.formatSpaceInOperator(
        element.assignmentOperator
      );
      const selectedGameObject = options[0];

      if (selectedGameObject === "putInTheBag") {
        const selectedItem = options[2];
        stringCondition = `${assignmentOperator} putInTheBag(gc, '${selectedItem}')`;
      }

      if (selectedGameObject === "insertAction") {
        const selectedAction = options[2];
        stringCondition = `${assignmentOperator} insertAction(gc, '${selectedAction}')`;
      }

      if (selectedGameObject === "actor") {
        const selectedActor = options[1];
        const selectedActorProperty = options[2];
        const selectedStatusProprety = options[3];

        if (selectedActorProperty === "status") {
          if (selectedStatusProprety === "life") {
            stringCondition = `${assignmentOperator} ${element.statement}getActor(gc,'${selectedActor}').status.life`;
          }
          if (selectedStatusProprety === "active") {
            stringCondition = `${assignmentOperator} ${element.statement}getActor(gc,'${selectedActor}').status.active`;
          }
        }
      }

      if (selectedGameObject === "true" || selectedGameObject === "false") {
        stringCondition = `${assignmentOperator} ${selectedGameObject}`;
      }

      if (selectedGameObject === "random") {
        stringCondition = `${selectedGameObject}`;
      }
    });

    return "consequence here";
  }

  formatConditionArrayToLineString(conditionsArray, conditionsType) {
    let stringResult = "";
    if (conditionsType === "if_else") {
      // ternary
      stringResult = `${conditionsArray[0]} ? ${conditionsArray[1]} : ${conditionsArray[2]} `;
    } else {
      conditionsArray.forEach((condition) => {
        stringResult = stringResult + condition;
      });
    }

    return stringResult;
  }

  formatSpaceInOperator(operator) {
    if (["+", "-", "="].includes(operator)) {
      return " " + operator; // left space
    }
    if ([";".includes(operator)]) {
      return operator;
    }
  }
}
