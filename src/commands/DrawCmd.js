import Command from './Command';
import EndTurnCmd from './EndTurnCmd';

const localPlayerId = localStorage.getItem('uid');

export default class DrawCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'draw',
      playerId: playerId,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    const cond1 = this.gameState.isPlayersCurrentTurn(this.playerId);

    const cond2 = this.gameState.isActionContextEmpty();
    const cond3 = this.gameState.actionContextContains('drawAgain');

    const allCond = cond1 && (cond2 || cond3);
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      const card = this.gameState.deck.draw();
      this.player.addCard(card);

      this.end();
    }
  };

  end = () => {
    const isSecondDraw = this.gameState.actionContextContains('drawAgain');

    if (this.playerId === localPlayerId) {
      if (isSecondDraw) {
        new EndTurnCmd(this.gameState, this.playerId, null, true);
      } else {
        this.gameState.addActionContext('drawAgain');
      }
    }

    this.render();
  };

  render = () => {
    this.player.render();
  };
}
