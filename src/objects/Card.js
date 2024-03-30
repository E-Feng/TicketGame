import { renderCard } from '../helpers/renderer';

export default class Card {
  constructor(scene, color, id) {
    this.scene = scene;
    this.color = color;
    this.id = id;
    this.selected = false;
  }

  initObjs = () => {
    const container = this.scene.sys.displayList.getByName('cards');
    const obj = container.getByName(this.id);

    obj.setInteractive().on('pointerdown', () => this.toggleSelected());
  };

  render = () => {
    renderCard(this);
  };

  toggleSelected = () => {
    this.selected = !this.selected;
    this.render();
  };

  setDiscarded = () => {
    this.selected = false;
  };
}
