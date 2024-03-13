import ConfirmButton from './ConfirmButton';
import { NUM_TRAINS } from '../helpers/settings';
import {
  renderHand,
  renderDestCards,
  renderPlayerCard,
  playerColorMap,
  renderIndicator,
  renderConfirmButton,
  renderBoard
} from '../helpers/renderer';

const localPlayerId = localStorage.getItem('uid');

export default class Player {
  constructor(scene, gameState, id, order) {
    this.scene = scene;

    this.id = id;
    this.colorName = Object.keys(playerColorMap)[order];
    this.color = playerColorMap[this.colorName];
    this.order = order;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS;
    this.hand = [];
    this.destCards = [];
    this.pendingDestCards = [];

    this.confirmButton = new ConfirmButton(scene, gameState)

    this.indicator = scene.add
      .rectangle()
      .setFillStyle(0xc9d3dc, 1)
      .setVisible(false);

    this.objGroup = {};
    this.objGroup.id = id;
    this.objGroup.order = order;
    this.objGroup.bg = scene.add.rectangle().setFillStyle(this.color, 0.5);
    this.objGroup.points = scene.add.text(0, 0, this.points);
    this.objGroup.trainsLeft = scene.add.text(0, 0, this.trainsLeft);
    this.objGroup.handSize = scene.add.text(0, 0, this.hand.length);
    this.objGroup.numDestCards = scene.add.text(0, 0, this.destCards.length);
  }

  render = () => {
    this.updateScoreboard();

    if (this.id === localPlayerId) {
      renderHand(this.hand);
      renderDestCards(this.destCards, this.pendingDestCards);
      renderIndicator(this.indicator);
      renderConfirmButton(this.confirmButton)
      renderBoard()
    }
    renderPlayerCard(this.objGroup, this.scene);
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
    const idx = this.hand.findIndex((c) => c.color === color);
    const card = this.hand.splice(idx, 1)[0];

    return card;
  };

  addPendingDestCard = (destCard) => this.pendingDestCards.push(destCard);
  addDestCard = (destCard) => this.destCards.push(destCard);
  hasPendingDestCards = () => this.pendingDestCards.length > 0;
  getSelectedDestCards = () => this.pendingDestCards.filter((c) => c.selected);

  addPoints = (pts) => (this.points += pts);
  minusTrains = (nTrains) => (this.trainsLeft -= nTrains);

  updateScoreboard = () => {
    this.objGroup.points.text = `P: ${this.points}`;
    this.objGroup.trainsLeft.text = `T: ${this.trainsLeft}`;
    this.objGroup.handSize.text = `C: ${this.hand.length}`;
    this.objGroup.numDestCards.text = `D: ${this.destCards.length}`;
  };
}
