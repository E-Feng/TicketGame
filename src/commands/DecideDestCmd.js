import Command from './Command';
import { renderDestCards, renderBoard } from '../helpers/renderer';

export default class DecideDestCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'decideDest',
      playerId: playerId,
      payload: payload,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const minSelected = this.player.destCards ? 1 : 2;

    const cond1 = this.player.hasPendingDestCards();
    const cond2 = this.player.getSelectedDestCards().length > minSelected;

    const allCond = cond1 && cond2;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      const ids = this.payload.id;

      this.player.pendingDestCards.forEach((destCard) => {
        if (ids.includes(destCard.id)) {
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
    this.gameState.clearActionContext()

    this.render();
  };

  render = () => {
    renderDestCards();
    renderBoard();
  };
}
