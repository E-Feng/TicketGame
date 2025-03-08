import Route from './Route';
import {
  renderBoard,
  renderCurrentTurnEmoji,
  renderCurrentTurnMessage,
} from '../helpers/renderer';
import { ROUTES } from '../helpers/boardConsts';

let localPlayerId = localStorage.getItem('uid');

export default class Board {
  constructor(scene, gameState) {
    this.scene = scene;
    this.gameState = gameState;

    this.routes = ROUTES.map((r) => {
      return new Route(scene, gameState, r);
    });
  }

  render = () => {
    renderBoard();
    renderCurrentTurnEmoji();
    renderCurrentTurnMessage();
  };

  getRouteById = (id) => this.routes.filter((r) => r.id === id)[0];

  getPlayerRoutes = (playerId) => {
    const playerRoutes = this.routes.filter((r) => {
      const trackOwners = r.tracks.map((t) => t.owner);
      return trackOwners.includes(playerId);
    });
    return playerRoutes;
  };
}
