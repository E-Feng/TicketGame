import Card from './Card';

import { shuffleArray } from '../utils/funcs';
import { COLOR_VALUES } from './settings';

export default class Deck {
  constructor(initDeck) {
    this.cards = [];
    this.boardCards = [null, null, null, null, null];

    if (initDeck) {
      this.setJSONData(initDeck);
    } else {
      this.initDeck(COLOR_VALUES);
      this.shuffle();
      this.replaceBoardCard();
    }
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
    shuffleArray(this.cards);
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
}
