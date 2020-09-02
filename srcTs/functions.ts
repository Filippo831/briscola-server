import { Cart, logicProps, player, returnValues } from "./interfaces";
const fs = require("fs");

//  get info by json file
const valuesData = fs.readFileSync("./pointsValue.json", "utf-8");
const data = JSON.parse(valuesData);

let gameDeck: Cart[] = [];
let briscola: Cart;
const players: Array<player> = [];

//  INIZIALIZE GAME
const inizialiezeCartArray = () => {
  for (let i = 0; i < 40; i++) {
    gameDeck[i] = {
      value: data.value[(i % 10).toString()],
      points: data.points[(i % 10).toString()],
      briscola: false,
      seed: Math.floor(i / 10),
      number: i,
    };
  }
};

//  shuffle the array
const shuffleCartArray = () => {
  for (let a = gameDeck.length; a > 0; a--) {
    const j = Math.floor(Math.random() * a);
    let temp = gameDeck[j];
    gameDeck[j] = gameDeck[a];
    gameDeck[a] = temp;
  }
};
export const inizializeGame = () => {
  inizialiezeCartArray();
  shuffleCartArray();
  let index;
  for (let forVar = 0; forVar < 2; forVar++) {
    index = forVar * 3;
    players[forVar] = new player(gameDeck.slice(index, index + 3));
  }
  briscola = gameDeck[index + 3];
  gameDeck.splice(0, index + 2);
  return { gameDeck, players, briscola };
};

//  LOGIC
const calcFirst = (cart1: Cart, cart2: Cart) => {
  return cart1.value > cart2.value ? 0 : 1;
};

//  winner function
const logicFunction = (cart1: Cart, cart2: Cart) => {
  let returnValues: returnValues = {
    points: 0,
    first: 0,
  };
  if (cart1.briscola) {
    returnValues.first = cart2.briscola ? calcFirst(cart1, cart2) : 0;
  } else if (cart2.briscola) {
    returnValues.first = 1;
  } else {
    returnValues.first = cart1.seed != cart2.seed ? 0 : calcFirst(cart1, cart2);
  }
  returnValues.points = cart1.points + cart2.points;
  return returnValues;
};

//  main logic function
let runValues: returnValues;
export const logic = (props: logicProps) => {
  if (props.first === 0) {
    runValues = logicFunction(props.cart1, props.cart2);
  } else {
    let gameValues = logicFunction(props.cart2, props.cart1);
    runValues.first = Math.abs(gameValues.first - 1);
  }
  return runValues;
};
