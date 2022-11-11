const mod = require("../models/models");

const jwt = require("jsonwebtoken");

const secret = process.env.SESSION_SECRET;

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

exports.getBoxerByNickname = (nickname) => {
  const boxersArray = mod.selectAllWithParam("boxer", "nickname", nickname)

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

exports.getAchievements = async () => {
  const achievementsArray = await mod.selectAll("achievement");

  return achievementsArray.map(item => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      tiers_array: item.tiers_array.split(",")
    }
  });
}

//Auth

exports.signUpUser = async (userInfo) => {

  //We will allow multiple accounts for the same email address, however handles must be unique.

  const {handle, email, password} = userInfo;
  const handleFound = await mod.handleExists(handle)

  if(handleFound) {
    return "Duplicate handle. Please choose another handle!"
  }

  const newId = await mod.addUser({
    handle: handle,
    email: email,
    password: password
  })

  //returns the new user, now with a shiny new ID
  return { id: newId[0],
    handle: handle,
    email: email,
    password: password }
}

exports.loginUser = async (userInfo) => {
  const user = await mod.getUserByHandleOrEmail(userInfo.username)

  if (!user) {
    return ("No user found with that handle or email")
  }

  if (user.password !== userInfo.password) {
    return ("Password incorrect!")
  }

  return ({ token: jwt.sign({ handle: user.handle }, secret) });
}

exports.getProfile = async (bearerToken) => {
  const token = bearerToken.split(" ")[1];

  if(jwt.verify(token, secret)) {
    const user = await mod.getUserByHandleOrEmail(jwt.decode(token).handle)
    return user;
  }

  return "Error: invalid token"
}