import Command from './Command';

export default class BuildCmd extends Command {
  constructor(gameState, playerId, payload, init) {
    super(gameState, playerId, payload);

    this.event = {
      command: 'build',
      playerId: playerId,
      payload: payload,
    };
    this.route = this.board.getRouteById(payload)
    this.selectedCards = this.player.getSelectedCards()
    this.selectedTotal = this.player.getSelectedTotal()

    if (this.isLegal() && init) {
      this.send(this.event);
    }
  }

  isLegal = () => {
    console.log("clicked build")
    const cond1 = this.gameState.isPlayersCurrentTurn(this.playerId);
    const cond2 = this.gameState.isActionContextEmpty();

    const cond3 = this.route.canBuildTrack(this.selectedTotal)
    console.log(cond3)

    return cond1 && cond2;
  };

  apply = () => {
    if (this.isLegal) {
      const routeId = this.event.payload
      console.log(routeId, this.route)
      this.route.setOwner(this.playerId, 'grey')

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
