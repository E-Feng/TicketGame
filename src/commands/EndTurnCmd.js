import Command from './Command';

const localPlayerId = localStorage.getItem('uid');

export default class EndTurnCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

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
  };
}
