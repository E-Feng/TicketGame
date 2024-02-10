import DrawFaceUpCardCmd from '../commands/DrawFaceUpCardCmd';

let playerId = localStorage.getItem('uid');

export default class FaceUpCards {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.cards = [null, null, null, null, null];
  }

  replaceFaceUpCard = (card) => {
    const idx = this.cards.findIndex((c) => c === null);
    this.cards[idx] = card;
  };

  getCardByIndex = (i) => this.cards[i];
  removeCardByIndex = (i) => (this.cards[i] = null);

  render = () => {
    this.cards.forEach((card, i) => {
      const a = this.scene.add.image(500, i * 50 + 50, card.color);
      a.setInteractive();
      a.on('pointerdown', (a) => {
        new DrawFaceUpCardCmd(this.gameState, playerId, i, true);
      });
    });
  };
}
