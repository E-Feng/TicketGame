import Command from './Command';

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
    const numPlayers = this.gameState.players.length;
    const currentIdx = this.gameState.players.findIndex(
      (p) => p.uid === this.playerId
    );
    const nextIdx = (currentIdx + 1) % numPlayers;

    this.gameState.clearActionContext();
    this.gameState.setCurrentTurn(nextIdx);
  };
}
