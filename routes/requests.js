const con = require("../controllers/controllers.js");

exports.welcomeMessage = (_req, res) => {
  res.status(200).send("Welcome to Angelo Boxing Coach API!")
}

exports.getBoxers = async (_req, res) => {
  const boxersArray = await con.getBoxers();

  res.status(200).send(boxersArray)
}

exports.getBoxerByNickname = async (req, res) => {
  const boxer = await con.getBoxerByNickname(req.params["nickname"])

  //sending the first instance, if we get more than one boxer with same nickname
  res.status(200).send(boxer[0])
}

exports.getActions = async (_req, res) => {
  const actionsArray = await con.getActions();

  res.status(200).send(actionsArray)
}

exports.getCombos = async (_req, res) => {
  const combosArray = await con.getCombos();

  res.status(200).send(combosArray)
}

exports.getActionsWithTypes = async (_req, res) => {
  const actionsWithTypesArray = await con.getActionsWithTypes();

  res.status(200).send(actionsWithTypesArray)
}

exports.getActionTypes = async (_req, res) => {
  const actionTypesArray = await con.getActionTypes();

  res.status(200).send(actionTypesArray)
}

exports.getAchievements = async (_req, res) => {
  const achievementsArray = await con.getAchievements();

  res.status(200).send(achievementsArray)
}

//Auth

exports.signUpUser = async (req, res) => {
  const signUp = await con.signUpUser(req.body)

  if((typeof signUp) === "string") {
    res.status(400).send(signUp)
  } else {
    res.status(201).send(signUp)
  }

  
}

exports.loginUser = async (req, res) => {
  const login = await con.loginUser(req.body)

  if ((typeof login) === "string") {
    res.status(403).send(login)
  } else {
    res.status(200).send(login)
  }
  
}

exports.getProfile = async (req, res) => {
  const profile = await con.getProfile(req.headers.authorization)

  res.status(200).send(profile)
}