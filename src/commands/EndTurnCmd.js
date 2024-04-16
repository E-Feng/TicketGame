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
    // Setting next turn
    const numPlayers = this.players.length;
    const currentIdx = this.players.findIndex((p) => p.id === this.playerId);
    const nextIdx = (currentIdx + 1) % numPlayers;

    this.gameState.setCurrentTurn(nextIdx);

    currentTurnEmojiTween();

    // Shuffling discard if deck is empty and replace faceup
    if (!this.deck.hasCards()) {
      this.deck.shuffleDiscardIntoDeck();
    }

    const numEmpty = this.faceUpCards.getEmptyCount();
    for (let i = 0; i < numEmpty; i++) {
      const newCard = this.gameState.deck.draw();
      this.faceUpCards.replaceFaceUpCard(newCard);
    }

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
    this.faceUpCards.render()
    this.deck.render();
  };
}
