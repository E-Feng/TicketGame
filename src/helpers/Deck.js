import Card from './Card';
import DrawCmd from '../commands/DrawCmd';
import { renderDeck } from './renderer';
import { shuffleArray } from '../utils/funcs';
import { COLOR_VALUES } from './settings';

let playerId = localStorage.getItem('uid');

export default class Deck {
  constructor(scene, gameState, initDeck) {
    this.scene = scene;
    this.obj = scene.add.image();
    this.cards = [];
    this.discard = [];

    if (initDeck) {
      this.setJSONData(initDeck);
    } else {
      this.initDeck(COLOR_VALUES);
      this.shuffle();
    }

    this.obj.setInteractive();
    this.obj.on('pointerdown', () => {
      new DrawCmd(gameState, playerId, null, true);
    });
  }

  getJSONData = () => {
    const data = [];
    this.cards.forEach((card) => data.push(card.color));

    return data;
  };
  setJSONData = (data) => {
    this.cards = data.map((color) => new Card(this.scene, color));
  };

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
    shuffleArray(this.cards);
  };

  draw = () => this.cards.pop();
}
