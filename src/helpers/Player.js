export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.hand = [];
  }

  addToHand = (card) => {
    this.hand.push(card)

    console.log(this.hand)
  }

  render = () => {
    this.hand.forEach((card, i) => {
      this.scene.add.image(100, 100 + i*20, card.color);
    })
  }
}
