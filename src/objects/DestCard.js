import { renderDestCards } from '../helpers/renderer';

export default class DestCard {
  constructor(scene, gameState, props) {
    this.scene = scene;

    this.id = props.id;
    this.cities = props.cities;
    this.points = props.points;
    this.selected = false;

    this.objGroup = {};
    this.objGroup.card = scene.add.rectangle().setVisible(false);
    this.objGroup.cities = scene.add.text(0, 0, props.cities).setVisible(false);
    this.objGroup.points = scene.add.text(0, 0, props.points).setVisible(false);

    this.objGroup.card
      .setInteractive()
      .on('pointerdown', () => this.toggleSelected());
  }

  toggleSelected = () => {
    this.selected = !this.selected;
    renderDestCards();
  };

  setVisible = (bool) => {
    this.objGroup.card.setVisible(bool);
    this.objGroup.cities.setVisible(bool);
    this.objGroup.points.setVisible(bool);
  };
}
