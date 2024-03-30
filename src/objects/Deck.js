import Card from './Card';
import DrawCmd from '../commands/DrawCmd';
import ShuffleCmd from '../commands/ShuffleCmd';
import { renderDeck } from '../helpers/renderer';
import { TRAIN_COLORS_SETUP } from '../helpers/settings';

let localPlayerId = localStorage.getItem('uid');

export default class Deck {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.cards = [];
    this.discardPile = [];

    this.initDeck();
  }

  initDeck = () => {
    let id = 0;

    TRAIN_COLORS_SETUP.forEach((colorInfo) => {
      for (let i = 0; i < colorInfo.number; i++) {
        const card = new Card(this.scene, colorInfo.color, id);
        this.cards.push(card);
        id++;
      }
    });
  };

  initObjs = () => {
    const container = this.scene.sys.displayList.getByName('deck');
    const obj = container.getByName('deck');

    obj.setInteractive().on('pointerdown', () => {
      new DrawCmd(this.scene, this.gameState, localPlayerId, null, true);
    });
  };

  render = () => {
    renderDeck();
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
