import { renderCard } from './renderer';

export default class Card {
  constructor(scene, color) {
    this.scene = scene;
    this.obj = scene.add.image();
    this.color = color;
    this.selected = false;

    this.obj.setTexture(color);
    this.obj.setAngle(90);
    this.obj.setPosition(0, 0);
    this.obj.setActive(false);

    this.obj.setInteractive();
    this.obj.on('pointerdown', () => this.toggleSelected());
  }

  render = () => {
    renderCard(this);
  };

  toggleSelected = () => {
    this.selected = !this.selected;
    this.render();
  };
}
