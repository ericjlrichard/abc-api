if (process.env.NODE_ENV !== "production")
require("dotenv").config();

const express = require("express");


const knex = require('knex')(require('./knexfile'));

const app = express();
const cors = require("cors");
app.use(cors({origin: true, credentials: true}))
app.use(express.json());

app.use(express.static("public"))


const req = require("./routes/requests.js")

const PORT = process.env.PORT

// End imports and declarations


app.get("/", req.welcomeMessage);

app.get("/boxers", req.getBoxers)

app.get("/actions", req.getActions)

app.get("/combos", req.getCombos)

app.get("/actionswithtypes", req.getActionsWithTypes)

app.get("/actiontypes", req.getActionTypes)

app.listen(PORT, () => {
  console.log("Running smoothly AF on port " + PORT)
});