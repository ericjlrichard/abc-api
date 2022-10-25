const con = require("../controllers/controllers.js");

exports.welcomeMessage = (_req, res) => {
  res.status(200).send("Welcome to Angelo Boxing Coach API!")
}

exports.getBoxers = async (_req, res) => {
  const boxersArray = await con.getBoxers();

  res.status(200).send(boxersArray)
}