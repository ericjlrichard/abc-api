const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production")
  require("dotenv").config();

const req = require("./routes/requests.js")

const PORT = process.env.PORT

// End imports and declarations


app.get("/", req.welcomeMessage);

app.get("/boxers", req.getBoxers)

app.listen(PORT, () => {
  console.log("Running smoothly AF on port " + PORT)
});