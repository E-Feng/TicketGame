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
    console.log('Confirm testing', this);
    const cond1 = this.player.hasPendingDestCards();
    const cond2 = this.player.getSelectedDestCards().length > 0;

    console.log(this.gameState, cond1, cond2);

    const allCond = cond1 && cond2;
    return allCond;
  };

  apply = () => {
    console.log(this.payload);
    if (this.isLegal()) {
      const ids = this.payload.id;

      this.player.pendingDestCards.forEach((destCard) => {
        if (ids.includes(destCard.id)) {
          this.player.addDestCard(destCard);
        } else {
          destCard.setVisible(false)
          this.destDeck.discard(destCard);
        }
      });
      this.player.pendingDestCards = [];

      this.end();
    }
  };

  end = () => {
    this.render()
  };

  render = () => {
    renderDestCards();
    renderBoard()
  };
}
