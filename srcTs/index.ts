const express = require("express");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");

import { inizializeGame, logic } from "./functions";
import { Cart, logicProps, player, returnValues } from "./interfaces";

const app = express();

interface usersInterface {
  name: string;
  server: number;
}

let users: Array<Array<usersInterface>> = [[]];

let { gameDeck, players, briscola } = inizializeGame();

//  inizialize server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: any, res: any) => {
  res.send("<h1>ciao, benvenuto nel gioco della briscola</h1>");
});

app.post("/login", (req: any, res: any) => {
  let userData: usersInterface = req.body;
  if (users[req.body.server] === undefined) {
    users[req.body.server] = [];
    users[req.body.server].push(userData);
  } else {
    users[req.body.server].push(userData);
  }
  console.log(users);
  res.redirect(`/server/${req.body.server}`);
});

app.get("/server/:serverNumber", (req: any, res: any) => {
  if (users[1].length == 2) {
    res.send("<h1>siamo in 2</h1>");
    res.redirect(`/server/${req.params.serverNumber}/game`);
  }
  res.send("<h1>cioa come va la vita</h1>");
  console.log(req.params);
});

app.post("server/:serverNumber/game", (req: any, res: any) => {
  let { gameDeck, players, briscola } = inizializeGame();
});

app.get("server/:serverNumber/game", (req: any, res: any) => {
  res.send("<h1>siamo nel gioco</h1>");
  console.log("tutto pronto");
});

app.listen(3000, (req: any, res: any) => {
  console.log("listening on 3000");
});
