import Card from './Card';

export default class Deck {
  constructor(scene, colors) {
    this.cards = [];
    this.boardCards = [null, null, null, null, null];

    this.initDeck(colors);
    this.shuffle();
    this.replaceBoardCard();
  }

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
