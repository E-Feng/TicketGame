import Phaser from 'phaser';

import Player from '../helpers/Player';
import Deck from '../helpers/Deck';
import Card from '../helpers/Card';

const nMaxPlayers = 5;
const nTrains = 45;

const colors = {
  green: 12,
  yellow: 12,
  orange: 12,
  white: 12,
  black: 12,
  red: 12,
  blue: 12,
  pink: 12,
  wild: 14,
};

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    for (const color in colors) {
      this.load.image(color, `src/assets/${color}.png`);
    }
  }

  create() {
    this.player = new Player(this);
    this.deck = new Deck(this, colors);

    this.dealText = this.add.text(300, 300, ['DECK HERE']).setInteractive();
    this.dealText.on('pointerdown', () => this.deck.dealToHand(this.player));
  }
}
