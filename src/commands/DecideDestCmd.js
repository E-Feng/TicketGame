import Command from './Command';
import { NUM_KEEP_DEST_CARDS } from '../helpers/settings';

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
    const isInitial = this.player.destCards.length == 0;
    const minSelected = isInitial
      ? NUM_KEEP_DEST_CARDS[0]
      : NUM_KEEP_DEST_CARDS[1];

    const cond1 = this.player.hasPendingDestCards();
    const cond2 = this.selectedIds.length >= minSelected;

    const allCond = cond1 && cond2;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      this.player.pendingDestCards.forEach((destCard) => {
        if (this.selectedIds.includes(destCard.id)) {
          this.player.addDestCard(destCard);
        } else {
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
    this.destDeck.render();
    this.board.render();
    this.player.render();
  };
}
