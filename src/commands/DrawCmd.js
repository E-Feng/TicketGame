import Command from './Command';
import EndTurnCmd from './EndTurnCmd';
import { drawTween } from '../helpers/tweens';

const localPlayerId = localStorage.getItem('uid');

export default class DrawCmd extends Command {
  constructor(scene, gameState, playerId, payload, init) {
    super(scene, gameState, playerId, payload);

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

    const cond2 = this.player.isActionContextEmpty();
    const cond3 = this.player.actionContextContains('drawAgain');

    const cond4 = this.deck.hasCards();

    const allCond = cond1 && (cond2 || cond3) && cond4;
    return allCond;
  };

  apply = () => {
    if (this.isLegal()) {
      drawTween({ name: 'deck', playerId: this.playerId });
      const card = this.deck.draw();
      this.player.addCard(card);

      this.end();
    }
  };

  end = () => {
    const isSecondDraw = this.player.actionContextContains('drawAgain');

    if (this.playerId === localPlayerId) {
      if (isSecondDraw) {
        this.player.clearActionContext();
        new EndTurnCmd(this.scene, this.gameState, this.playerId, null, true);
      } else {
        this.player.addActionContext('drawAgain');
      }

      if (!this.deck.hasCards()) {
        this.deck.shuffleDiscardIntoDeck();
      }
    }

    this.render();
  };

  render = () => {
    this.player.render();
    this.deck.render();
    this.board.render()
  };
}
