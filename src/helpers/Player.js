import { NUM_TRAINS } from "./settings";

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.id = 1;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS
    this.hand = [];

    this.pointsText = scene.add.text(200, 200, [this.hand.length]);
  }

  render = () => {
    this.hand.forEach((card, i) => {
      const aa = this.scene.add.image(100 + i*20, 500, card.color).setAngle(90);
    })
    this.pointsText.setText(this.hand.length)
  }
}
