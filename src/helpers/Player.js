import { NUM_TRAINS, COLOR_VALUES } from './settings';
import { renderHand } from './renderer';

export default class Player {
  constructor(scene, uid) {
    this.scene = scene;

    this.uid = uid;
    this.id = 1;
    this.points = 1;
    this.trainsLeft = NUM_TRAINS;

    this.hand = [];
  }

  render = () => {
    renderHand(this.hand);
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

  getSelectedTotal = () => {
    const cards = this.getSelectedCards();
    const summary = {};
    Object.keys(COLOR_VALUES).forEach((c) => (summary[c] = 0));

    cards.forEach((card) => {
      const color = card.color;
      summary[color] = summary[color] + 1;
    });
    return summary;
  };
}
