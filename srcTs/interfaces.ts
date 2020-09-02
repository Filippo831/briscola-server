//  interfaces
export interface Cart {
  number: number;
  value: number;
  points: number;
  seed: number;
  briscola: boolean;
}

export interface logicProps {
  cart1: Cart;
  cart2: Cart;
  first: number;
}
export interface returnValues {
  points: number;
  first: number;
}

export class player {
  deck: Array<Cart>;
  points: number = 0;
  constructor(deck: Array<Cart>) {
    this.deck = deck;
  }
}
