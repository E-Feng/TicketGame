import Card from './Card';

import { COLOR_VALUES } from './settings';

export default class Deck {
  constructor() {
    this.cards = [];
    this.boardCards = [null, null, null, null, null];

    this.initDeck(COLOR_VALUES);
    this.shuffle();
    this.replaceBoardCard();
  }

  getJSONData = () => {
    const data = [];
    this.cards.forEach((card) => data.push(card.color));

    return data;
  };
  setJSONData = (data) => {
    this.cards = data.map((color) => new Card(color));
  };

  initDeck = (colors) => {
    for (const color of Object.keys(colors)) {
      for (let i = 0; i < colors[color]; i++) {
        const card = new Card(color);
        this.cards.push(card);
      }
    }
  };

  shuffle = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  };

  draw = () => this.cards.pop();

  replaceBoardCard = () => {
    this.boardCards.forEach((card, i) => {
      if (card === null) {
        const newCard = this.cards.pop();
        this.boardCards[i] = newCard;
      }
    });
  };

  // dealToHand = (player) => {
  //   const card = this.deck.pop();
  //   player.addToHand(card);
  //   player.render();
  //   setData(card.color)
  // };
}
