import Card from './Card';
import DrawCmd from '../commands/DrawCmd';
import { renderDeck } from '../helpers/renderer';
import { shuffleArray } from '../utils/funcs';
import { COLOR_VALUES } from '../helpers/settings';

let playerId = localStorage.getItem('uid');

export default class Deck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.obj = scene.add.image();
    this.cards = [];
    this.discardPile = [];

    this.initDeck(COLOR_VALUES);

    this.obj.setInteractive();
    this.obj.on('pointerdown', () => {
      new DrawCmd(gameState, playerId, null, true);
    });
  }

  initDeck = (colors) => {
    for (const color of Object.keys(colors)) {
      for (let i = 0; i < colors[color]; i++) {
        const card = new Card(this.scene, color);
        this.cards.push(card);
      }
    }
  };

  render = () => {
    renderDeck(this);
  };

  shuffle = () => {
    shuffleArray(this.cards, Math.random());
  };

  draw = () => this.cards.pop();

  discard = (card) => {
    card.setDiscarded();
    this.discardPile.push(card);
  };
}
