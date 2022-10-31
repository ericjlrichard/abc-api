const mod = require("../models/models");

//Since SQL doesn't permit construction of inner arrays, here's a function that does that.
const constructActionsWithTypeArray = (actions, types) => {
  const uniqueActionsId = [];
  const actionsWithTypesArray = []

  //collection unique action IDs
  actions.forEach(item => {
    if (uniqueActionsId.indexOf(item.id) < 0 ) {
      uniqueActionsId.push(item.id)
    }
  })

  //for each unique id, return an object with a types array containing the different types of this action.
  uniqueActionsId.forEach(uniqueActionId => {
    const actionsType = actions.filter(action => action.id === uniqueActionId)

    const typesArray = []
    
    actionsType.forEach(action => {
      typesArray.push(types.filter(type => type.id === action.action_type_id)[0].name)
    })

    actionsWithTypesArray.push({
      "id": uniqueActionId,
      "code": actionsType[0].code,
      "name": actionsType[0].name,
      "description": actionsType[0].description,
      "types": typesArray
    })
    
  })

  return actionsWithTypesArray
}

exports.getBoxers = () => {
  const boxersArray = mod.selectAll("boxer");

  return boxersArray;
}

exports.getActions = () => {
  const actionsArray = mod.selectAll("action");

  return actionsArray;
}

exports.getCombos = () => {
  const combosArray = mod.getCombosBoxers("");

  return combosArray;
}

exports.getActionsWithTypes= async () => {
  const actionsWithTypesArray = await mod.getActionsWithTypes();

  const actionTypes = await this.getActionTypes();

  return constructActionsWithTypeArray(actionsWithTypesArray, actionTypes);
}

exports.getActionTypes = async () => {
  const actionTypesArray = await mod.selectAll("action_type");

  return actionTypesArray
}