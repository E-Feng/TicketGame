import ConfirmButton from './ConfirmButton';
import { NUM_TRAINS } from '../helpers/settings';
import { playerColorMap } from '../helpers/colors';
import { getLongestPathLength, isDestComplete } from '../helpers/routeMath';
import {
  renderHand,
  renderDestCards,
  renderPlayerCard,
  renderConfirmButton,
  renderBoard,
} from '../helpers/renderer';

const localPlayerId = localStorage.getItem('uid');

export default class Player {
  constructor(scene, gameState, player, order) {
    this.scene = scene;
    this.gameState = gameState;

    this.id = player.id;
    this.display = player.display || player.id.slice(0, 4);
    this.colorName = playerColorMap[order].name;
    this.color = playerColorMap[order].code;
    this.order = order;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS;
    this.longestPathLength = 0;

    this.hand = [];
    this.destCards = [];
    this.pendingDestCards = [];
    this.actionContext = [];

    this.confirmButton = new ConfirmButton(scene, gameState);
  }

  render = () => {
    if (this.id === localPlayerId) {
      renderHand(this);
      renderDestCards(this);
      renderConfirmButton(this.confirmButton);
      renderBoard();
    }
    renderPlayerCard(this);
  };

  sortCards = (a, b) => {
    const aa = a.color;
    const bb = b.color;

    return aa == 'wild' ? 1 : bb == 'wild' ? -1 : aa.localeCompare(bb);
  };
  addCard = (card) => {
    this.hand.push(card);
    this.hand.sort(this.sortCards);
  };
  getSelectedCards = () => this.hand.filter((card) => card.selected);
  removeCard = (color) => {
    const idxSel = this.hand.findIndex((c) => c.color === color && c.selected);
    const idxNon = this.hand.findIndex((c) => c.color === color);
    const idx = Math.max(idxSel, idxNon);

    const card = this.hand.splice(idx, 1)[0];

    return card;
  };

  addPendingDestCard = (destCard) => this.pendingDestCards.push(destCard);
  addDestCard = (destCard) => this.destCards.push(destCard);
  hasPendingDestCards = () => this.pendingDestCards.length > 0;
  getSelectedDestCards = () =>
    this.pendingDestCards.filter((c) => c.isSelected);

  markCompletedDests = () => {
    const routes = this.gameState.board.getPlayerRoutes(this.id);
    this.destCards.forEach((destCard) => {
      if (isDestComplete(destCard, routes)) {
        destCard.markCompleted();
      }
    });
  };
  calculateDestCardPoints = (destCard) => {
    this.addPoints(destCard.isCompleted ? destCard.points : -destCard.points);
  };

  addPoints = (pts) => (this.points += pts);
  minusTrains = (nTrains) => (this.trainsLeft -= nTrains);
  updateLongestPathLength = () => {
    const routes = this.gameState.board.getPlayerRoutes(this.id);
    this.longestPathLength = getLongestPathLength(routes);
  };

  isActionContextEmpty = () => this.actionContext.length === 0;
  actionContextContains = (action) => this.actionContext.includes(action);
  addActionContext = (action) => this.actionContext.push(action);
  clearActionContext = () => (this.actionContext.length = 0);
}
