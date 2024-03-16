import DrawFaceUpCmd from '../commands/DrawFaceUpCmd';
import { renderFaceUpCards } from '../helpers/renderer';
import { NUM_FACEUP_CARDS } from '../helpers/settings';

let localPlayerId = localStorage.getItem('uid');

export default class FaceUpCards {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.numCards = NUM_FACEUP_CARDS;
    this.cards = Array(NUM_FACEUP_CARDS).fill(null);
    this.objs = [];
  }

  initObjs = () => {
    const cards = this.scene.sys.displayList.getByName('faceUpCards').getAll();

    cards.forEach((obj, i) => {
      obj.setInteractive();
      obj.on('pointerdown', () => {
        new DrawFaceUpCmd(this.scene, this.gameState, localPlayerId, i, true);
      });
    });
  };

  render = () => {
    renderFaceUpCards();
  };

  replaceFaceUpCard = (card) => {
    const i = this.cards.findIndex((c) => c === null);
    this.cards[i] = card;
  };

  getCardByIndex = (i) => this.cards[i];
  removeCardByIndex = (i) => (this.cards[i] = null);
}
