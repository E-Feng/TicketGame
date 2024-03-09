import Route from './Route';
import { renderBoard } from '../helpers/renderer';
import { ROUTES } from '../helpers/settings';

let playerId = localStorage.getItem('uid');

export default class Board {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.routes = ROUTES.map((r) => {
      return new Route(scene, gameState, r)
    });
  }

  render = () => {
    renderBoard(this.scene, this.gameState, this.routes)
  }

  getRouteById = (id) => this.routes.filter(r => r.id === id)[0]
}
