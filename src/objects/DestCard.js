export default class DestCard {
  constructor(scene, gameState, props) {
    this.scene = scene;

    this.id = props.id;
    this.cities = props.cities;
    this.points = props.points;

    this.objGroup = {};
    this.objGroup.cities = scene.add.text(0, 0, props.cities).setVisible(false);
    this.objGroup.points = scene.add.text(0, 0, props.points).setVisible(false);
  }
}
