import { currentTurnEmojiTween, finalTurnTween } from '../helpers/tweens';
import Command from './Command';
import { NUM_TRAINS_END } from '../helpers/settings';

const localPlayerId = localStorage.getItem('uid');

export default class EndTurnCmd extends Command {
  constructor(scene, gameState, playerId, payload, init) {
    super(scene, gameState, playerId, payload);

    this.event = {
      command: 'endTurn',
      playerId: playerId,
    };

    if (init) {
      this.send(this.event);
    }
  }

  apply = () => {
    const numPlayers = this.players.length;
    const currentIdx = this.players.findIndex((p) => p.id === this.playerId);
    const nextIdx = (currentIdx + 1) % numPlayers;

    this.gameState.setCurrentTurn(nextIdx);

    currentTurnEmojiTween();

    this.end();
  };

  end = () => {
    const isFinalTurn = this.gameState.isFinalTurn();
    if (isFinalTurn) {
      this.player.addActionContext('gameOver');
    }

    if (this.player.trainsLeft <= NUM_TRAINS_END && !isFinalTurn) {
      this.gameState.beginFinalTurn();
      finalTurnTween();
    }
    
    this.render();
  };

  render = () => {
    this.board.render();
  };
}
