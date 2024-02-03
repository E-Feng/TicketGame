import Command from './Command';

export default class DrawCommand extends Command {
  constructor(gameState, playerId, init) {
    super();

    this.gameState = gameState;
    this.playerId = playerId;

    this.event = {
      command: 'draw',
      playerId: playerId,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  apply() {
    if (this.isLegal()) {
      const card = this.gameState.deck.deck.pop();
      const player = this.gameState.players.filter(
        (p) => p.id == this.playerId
      )[0];

      console.log(this.playerId, this.gameState.players, player);
      player.hand.push(card);
      player.render()

      this.gameState.events.push(this.event);
    }
  }

  isLegal() {
    return true;
  }
}
