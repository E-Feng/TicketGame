import Phaser from 'phaser';

import Player from '../helpers/Player';
import Deck from '../helpers/Deck';
import Card from '../helpers/Card';
import { COLOR_VALUES } from '../helpers/settings';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    for (const color in COLOR_VALUES) {
      this.load.image(color, `src/assets/${color}.png`);
    }
  }

  create() {
    this.player = new Player(this);
    this.deck = new Deck(this, COLOR_VALUES);

    this.dealText = this.add.text(300, 300, ['DECK HERE']).setInteractive();
    this.dealText.on('pointerdown', () => this.deck.dealToHand(this.player));
  }

}
