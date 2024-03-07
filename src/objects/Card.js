import { renderCard } from '../helpers/renderer';

export default class Card {
  constructor(scene, color) {
    this.scene = scene;
    this.obj = scene.add.image().setVisible(false);
    this.color = color;
    this.selected = false;

    this.obj.setTexture(color);
    this.obj.setAngle(90);
    this.obj.setPosition(0, 0);

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

  setVisible = () => this.obj.setVisible(true);

  setDiscarded = () => {
    this.selected = false;
    this.obj.setVisible(false);
  };
}
