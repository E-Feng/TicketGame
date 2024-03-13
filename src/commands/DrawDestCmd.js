import Command from './Command';
import EndTurnCmd from './EndTurnCmd';
import { NUM_DRAW_DEST_CARDS } from '../helpers/settings';

const localPlayerId = localStorage.getItem('uid');

export default class DrawDestCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'drawDest',
      playerId: playerId,
      payload: payload,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const cond1 = this.gameState.getCurrentTurnId() === this.playerId;
    const cond2 = this.gameState.isActionContextEmpty();

    const allCond = cond1 && cond2;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      for (let i = 0; i < NUM_DRAW_DEST_CARDS; i++) {
        const destCard = this.destDeck.draw();
        this.player.addPendingDestCard(destCard);
      }
    }

    this.end();
  };

  end = () => {
    if (this.playerId === localPlayerId) {
      new EndTurnCmd(this.gameState, this.playerId, null, true);
    }

    this.render();
  };

  render = () => {
    console.log('rending dest player')

    this.player.render();
  };
}
