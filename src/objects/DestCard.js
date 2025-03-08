import { renderDestCards } from '../helpers/renderer';

const localPlayerId = localStorage.getItem('uid');

export default class DestCard {
  constructor(scene, gameState, props) {
    this.scene = scene;
    this.gameState = gameState;

    this.id = props.id;
    this.cities = props.cities;
    this.points = props.points;
    this.isCompleted = false;
    this.isSelected = false;
  }

  initObjs = () => {
    const container = this.scene.sys.displayList.getByName('destCards');
    const obj = container.getByName(this.id).getByName('card');

    obj.setInteractive().on('pointerdown', () => this.toggleSelected());
  };

  toggleSelected = () => {
    this.isSelected = !this.isSelected;
    if (this.gameState.status !== 'endGame') {
      renderDestCards(this.gameState.getPlayer(localPlayerId));
    }
  };

  markCompleted = () => (this.isCompleted = true);
}
