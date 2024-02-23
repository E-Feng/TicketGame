import Command from './Command';

export default class BuildCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'build',
      playerId: playerId,
      payload: payload,
    };

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    console.log("clicked build")
    const cond1 = this.gameState.isPlayersCurrentTurn(this.playerId);
    const cond2 = this.gameState.isActionContextEmpty();

    return cond1 && cond2;
  };

  apply = () => {
    if (this.isLegal) {
      const routeId = this.event.payload
      const route = this.board.getRouteById(routeId)

      this.board.setOwner(this.playerId, routeId, 'grey')

      this.end()
    }
  }

  end = () => {
    this.render()
  }

  render = () => {
    this.board.render()
  }
}
