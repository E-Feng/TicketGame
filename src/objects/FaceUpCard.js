import DrawFaceUpCmd from '../commands/DrawFaceUpCmd';
import { renderFaceUpCards } from '../helpers/renderer';
import { NUM_FACEUP_CARDS } from '../helpers/settings';

let playerId = localStorage.getItem('uid');

export default class FaceUpCard {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.cards = Array(NUM_FACEUP_CARDS).fill(null);
    this.objs = [];

    this.initObjects();
  }

  initObjects = () => {
    this.cards.forEach((_, i) => {
      const obj =  this.scene.add.image()
      obj.setInteractive()
      obj.on('pointerdown', () => {
        new DrawFaceUpCmd(this.gameState, playerId, i, true);
      });

      this.objs.push(obj)
    });
  };

  render = () => {
    renderFaceUpCards(this.objs);
  };

  replaceFaceUpCard = (card) => {
    const i = this.cards.findIndex((c) => c === null);
    this.cards[i] = card;

    this.objs[i].setData('color', card.color)
  };

  getCardByIndex = (i) => this.cards[i];
  removeCardByIndex = (i) => (this.cards[i] = null);
}
