import { NUM_TRAINS } from './settings';

export default class Player {
  constructor(scene, uid) {
    this.scene = scene;

    this.uid = uid;
    this.id = 1;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS;
    this.hand = [];

  }

  addCard = (card) => this.hand.push(card);

  render = () => {
    this.hand.forEach((card, i) => {
      const aa = this.scene.add
        .image(100 + i * 20, 500, card.color)
        .setAngle(90);
    });
  };
}
