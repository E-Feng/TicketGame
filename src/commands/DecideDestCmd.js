import Command from './Command';
import {
  renderDestCards,
  renderBoard,
  renderConfirmButton,
} from '../helpers/renderer';

export default class DecideDestCmd extends Command {
  constructor(scene, gameState, playerId, payload, init) {
    super(scene, gameState, playerId, payload);

    this.event = {
      command: 'decideDest',
      playerId: playerId,
      payload: payload,
    };
    this.selectedIds = payload.selectedIds;

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const minSelected = this.player.destCards.length ? 1 : 2;

    const cond1 = this.player.hasPendingDestCards();
    const cond2 = this.selectedIds.length >= minSelected;

    const allCond = cond1 && cond2;
    console.log(cond1, cond2);
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      this.player.pendingDestCards.forEach((destCard) => {
        if (this.selectedIds.includes(destCard.id)) {
          this.player.addDestCard(destCard);
        } else {
          destCard.setVisible(false);
          this.destDeck.discard(destCard);
        }
      });
      this.player.pendingDestCards = [];

      this.end();
    }
  };

  end = () => {
    this.player.clearActionContext();

    this.render();
  };

  render = () => {
    renderDestCards();
    renderBoard();
    this.player.render();
  };
}
