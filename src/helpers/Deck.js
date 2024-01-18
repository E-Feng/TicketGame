import Card from './Card';

export default class Deck {
  constructor(scene, colors) {
    this.deck = [];

    this.init(colors);
    this.shuffle();
  }

  init = (colors) => {
    for (const color of Object.keys(colors)) {
      for (let i = 0; i < colors[color]; i++) {
        const card = new Card(this, color);
        this.deck.push(card);
      }
    }
  };

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealToHand = (player) => {
    const card = this.deck.pop();
    player.addToHand(card);
    player.render()
  };
}