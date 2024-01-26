import { NUM_TRAINS } from "./settings";

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS
    this.hand = [];

    this.pointsText = scene.add.text(200, 200, [this.hand.length]);
  }

  addToHand = (card) => {
    this.hand.push(card)
  }

  render = () => {
    this.hand.forEach((card, i) => {
      const aa = this.scene.add.image(100, 100 + i*20, card.color);
    })
    this.pointsText.setText(this.hand.length)
  }
}
