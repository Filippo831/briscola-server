"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const functions_1 = require("./functions");
const app = express();
let users = [[]];
let { gameDeck, players, briscola } = functions_1.inizializeGame();
//  inizialize server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("<h1>ciao, benvenuto nel gioco della briscola</h1>");
});
app.post("/login", (req, res) => {
    let userData = req.body;
    if (users[req.body.server] === undefined) {
        users[req.body.server] = [];
        users[req.body.server].push(userData);
    }
    else {
        users[req.body.server].push(userData);
    }
    console.log(users);
    res.redirect(`/server/${req.body.server}`);
});
app.get("/server/:serverNumber", (req, res) => {
    if (users[1].length == 2) {
        res.send("<h1>siamo in 2</h1>");
        res.redirect(`/server/${req.params.serverNumber}/game`);
    }
    res.send("<h1>cioa come va la vita</h1>");
    console.log(req.params);
});
app.post("server/:serverNumber/game", (req, res) => {
    let { gameDeck, players, briscola } = functions_1.inizializeGame();
});
app.get("server/:serverNumber/game", (req, res) => {
    res.send("<h1>siamo nel gioco</h1>");
    console.log("tutto pronto");
});
app.listen(3000, (req, res) => {
    console.log("listening on 3000");
});
