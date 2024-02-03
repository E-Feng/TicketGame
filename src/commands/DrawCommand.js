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

  apply = () => {
    if (this.isLegal()) {
      const card = this.gameState.deck.draw();
      const player = this.gameState.getPlayer(this.playerId);

      player.addCard(card);

      if (this.playerId === localStorage.getItem('uid')) {
        player.render();
      }

      this.gameState.events.push(this.event);
    }
  };

  isLegal = () => {
    return true;
  };
}
