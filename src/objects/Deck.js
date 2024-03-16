import Card from './Card';
import DrawCmd from '../commands/DrawCmd';
import ShuffleCmd from '../commands/ShuffleCmd';
import { renderDeck } from '../helpers/renderer';
import { COLOR_VALUES } from '../helpers/settings';

let localPlayerId = localStorage.getItem('uid');

export default class Deck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.objs = {};
    this.cards = [];
    this.discardPile = [];

    this.initDeck(COLOR_VALUES);
  }

  initDeck = (colors) => {
    for (const color of Object.keys(colors)) {
      for (let i = 0; i < colors[color]; i++) {
        const card = new Card(this.scene, color);
        this.cards.push(card);
      }
    }
  };

  initObjs = () => {
    this.scene.sys.displayList
      .getByName('deck')
      .setInteractive()
      .on('pointerdown', () => {
        console.log(this.gameState);
        new DrawCmd(this.scene, this.gameState, localPlayerId, null, true);
      });

    // this.objs.counter = this.scene.add.text(0, 0, this.cards.length);
  };

  render = () => {
    renderDeck(this.objs);
  };

  hasCards = () => this.cards.length > 0;

  draw = () => this.cards.pop();

  discard = (card) => {
    card.setDiscarded();
    this.discardPile.push(card);
  };

  shuffleDiscardIntoDeck = () => {
    this.cards = this.cards.concat(this.discardPile);
    this.discardPile = [];

    const shuffleDeckPayload = { array: 'deck', seed: Math.random() };
    new ShuffleCmd(this.gameState, null, shuffleDeckPayload, true);
  };
}
