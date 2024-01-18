export default class Card {
  constructor(scene, color) {
    this.color = color

    this.render = (x, y, color) => {
      const card = scene.add.image(x, y, color)
      return card;
    }
  }
}